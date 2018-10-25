import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public anterior: string;
  public usuario:any = {};
  public productos = [];

  constructor( public ap: AppComponent, private _us: UsuarioService, private _cs: ComercioService ) { 

    // string con la urlAnterior
    this.anterior = this.ap.prevUrl;

  }

  ngOnInit() {

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();
          this.obtenerProductos( this.usuario.idCom ).subscribe( snap =>{
            this.productos = [];
            snap.forEach( data => {
              this.productos.push({
                id: data.payload.doc.id,
                img: data.payload.doc.data().img,
                nombre: data.payload.doc.data().nombre,
                ingredientes: data.payload.doc.data().ingredientes,
                precio: data.payload.doc.data().precio
              });
            });
            console.log(this.productos);
          });
        });
      } else{
        return;
      }
    });

  }



  // MÉTODOS ************************************

  private obtenerProductos( comercioId: string ){
    return this._cs.getProductos( comercioId );
  }

  private obtenerDocUsuario( usuarioId: string ){
    return this._us.getDocUsuario( usuarioId );
  }


}
