import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  public categorias = [];
  public productos = [];

  constructor( private _cs: ComercioService, private _us: UsuarioService ) { }

  ngOnInit() {

    this.obtenerCategorias( 'I8NViOS79Lap4LsPpJH0' ).subscribe( snap => {
      this.categorias = [];
      snap.forEach( data => {
        this.categorias.push({
          id: data.payload.doc.id,
          nombre: data.payload.doc.data().nombre
        });      
      });            
      console.log( this.categorias );
    }); 

    this.obtenerProductos( 'I8NViOS79Lap4LsPpJH0' ).subscribe( snap => {
      this.productos = [];
      snap.forEach( param => {
        this.productos.push({
          id: param.payload.doc.id,
          nombre: param.payload.doc.data().nombre,
          categoria: param.payload.doc.data().categoria
        });
      });
      console.log( this.productos );
    });

  }



  private obtenerCategorias( documentId: string ){
    return this._cs.getCategorias( documentId );
  }

  public guardarCategoria( documentId: string, nombre: string ){
    this._cs.pushCategoria( documentId, nombre );
  }

  private obtenerProductos( comercioId: string ){
    return this._cs.getProductos( comercioId );
  }

  public pushProducto( comercioId: string, nombre: string, cat: string ){
    return this._cs.afs.collection( 'comercios' ).doc( comercioId )
                    .collection( 'productos' ).add({
                      nombre: nombre,
                      categoria: cat
                    });
  }

}
