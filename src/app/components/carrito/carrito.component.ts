import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { CarritoService } from '../../providers/carrito.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  public refId:string;
  public comercio:any = {};

  constructor( private activatedRoute: ActivatedRoute, public _fs: FirebaseService, public _cs: CarritoService ) { 

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    })

  }

  ngOnInit() {

    // obtiene y almacena los datos de un comercio(ID)
    this._fs.getComercio( this.refId ).subscribe( datos => {
      this.comercio = datos.payload.data();
      console.log(this.comercio);  
      if( this.comercio.estado == true ){
        this.comercio.estado = 'Abierto';
      } else{
        this.comercio.estado = 'Cerrado';
      }       
    });

  }


  sumarCantidad( prod ){
    if( prod.cant >= 10 ){
      console.log("maximo");
    } else{
      prod.cant = parseInt( prod.cant ) + 1;
      console.log(prod.cant);
      prod.preTot = parseInt( prod.pre ) * prod.cant;
      console.log(prod.preTot);
    }    
  }

  restarCantidad( prod ){
    if( prod.cant == 1 ){
      // console.log("minimo");
    } else{
      prod.cant = parseInt( prod.cant ) - 1;
      console.log(prod.cant);
      prod.preTot = parseInt( prod.pre ) * prod.cant;
      console.log(prod.preTot);
    }
  }


}
