import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public anterior: string;

  public usuario:any = {};
  public categorias = [];
  public productos = [];

  constructor(  public ap: AppComponent, private _cs: ComercioService, private _us: UsuarioService  ) { 

    // string con la urlAnterior
    this.anterior = this.ap.prevUrl;

  }

  ngOnInit() {

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();
          this.obtenerCategorias( this.usuario.idCom ).subscribe( snap => {
            this.categorias = [];
            snap.forEach( data => {
              this.categorias.push({
                id: data.payload.doc.id,
                nombre: data.payload.doc.data().nombre
              });      
            }); 
            // console.log( this.categorias );
          });
          this.obtenerProductos( this.usuario.idCom ).subscribe( snap => {
            this.productos = [];
            snap.forEach( data => {
              this.productos.push({
                id: data.payload.doc.id,
                foto: data.payload.doc.data().img,
                nombre: data.payload.doc.data().nombre,
                categoria: data.payload.doc.data().categoria,
                ingredientes: data.payload.doc.data().ingredientes,
                precio: data.payload.doc.data().precio
              });
            });
            // console.log( this.productos );
          });
        });
      } else{
        return;
      }
    }); 

  }


    // MÉTODOS ***************************************

    private obtenerDocUsuario( id: string ){
      return this._us.getDocUsuario( id );
    }

    private obtenerCategorias( documentId: string ){
      return this._cs.getCategorias( documentId );
    }

    private obtenerProductos( comercioId: string ){
      return this._cs.getProductos( comercioId );
    }

}
