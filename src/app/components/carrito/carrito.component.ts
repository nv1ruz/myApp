import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { CarritoService } from '../../providers/carrito.service';
declare var $:any;
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  public refId:string;
  public comercio:any = {};
  precioTotal:number = 0;

  constructor( private activatedRoute: ActivatedRoute, public _fs: FirebaseService, public _cs: CarritoService ) { 

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    })


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
    
    this.sumarTotal();

  }

  ngOnInit() {
    

    // Mostrar-Ocultar Direccion y Precio Delivery
    $('#cambiarentrega').change(function(){
      var valorCambiado =$(this).val();
      console.log(valorCambiado);
      if(valorCambiado == '2'){
        $('#direcc').css('display','none');
        $('p.direcc').css('display','none');
        $('p.valordelivery').css('display','none');
        // $('input.valordelivery').css('display','none');
        // $('input.valordelivery').val('0');
      }
      else if(valorCambiado == '1')
      {
        $('#direcc').css('display','block');
        $('p.direcc').css('display','block');
        $('p.valordelivery').css('display','block');
        // $('input.valordelivery').css('display','block');
        // $('input.valordelivery').val('1');
        
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
    this.sumarTotal();
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
    this.sumarTotal();
  }

  sumarTotal(){
    this.precioTotal = 0;
    if( $('p.valordelivery').is(":visible") ){
      console.log(this.comercio.deliveryPrecio);
      this._cs.carrito.forEach( dato => {
        this.precioTotal += parseInt( dato.preTot );
      });
      this.precioTotal = this.precioTotal + this.comercio.deliveryPrecio;
    }else{
      console.log("none");
      this._cs.carrito.forEach( dato => {
        this.precioTotal += parseInt( dato.preTot );
      });
    }
    console.log(this.precioTotal);
   
  }

  quitarProducto( id ){
    this._cs.borrarProducto( id )
    this.sumarTotal();
  }


  

}
