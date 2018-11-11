import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public usuario:any = {};
  public categorias = [];
  public productos = [];

  constructor(  private _cs: ComercioService, private _us: UsuarioService, private router: Router  ) { }

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
                nombre: data.payload.doc.data().nombre,
                estado: data.payload.doc.data().estado
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
                precio: data.payload.doc.data().precio,
                estado: data.payload.doc.data().estado
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

    public irAtras(){
      this._us.goBack();
    }

    private obtenerDocUsuario( id: string ){
      return this._us.getDocUsuario( id );
    }

    private obtenerCategorias( documentId: string ){
      return this._cs.getCategorias( documentId );
    }

    private obtenerProductos( comercioId: string ){
      return this._cs.getProductos( comercioId );
    }

    public editarProducto( id: string ){
      this.router.navigate(['/micomercio/menu/producto', id]);
    }
    
    public actualizarEstadoCategoria( comercioId: string, categoriaId: string, estado: boolean ){
      this._cs.updCategoriaEstado( comercioId, categoriaId ).update({
        estado: !estado
      });
    }

    public actualizarEstadoProducto( comercioId: string, productoId: string, estado: boolean ){
      this._cs.updProductoEstado( comercioId, productoId ).update({
        estado: !estado
      });
    }

}
