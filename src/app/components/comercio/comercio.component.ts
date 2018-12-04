import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { FirebaseService } from '../../providers/firebase.service';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';
import { CarritoService } from '../../providers/carrito.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent implements OnInit {

  public refId:string;
  // public comercio: any = {};
  public comercio:any;
  public producto:any = {};
  public productosSugeridos = [];

  public categorias = [];
  public productos = [];
  // private vinculo: boolean = false;

  constructor( public ap: AppComponent, public _fs: FirebaseService, private _co: ComercioService, private _cs: CarritoService, private _us: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute ) {

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    })

  }

  ngOnInit() {

    this.obtenerComercio( this.refId ).subscribe( datos => {

      this.comercio = datos;
      if( this.comercio.activo ){
        // console.log( 'El comercio está activo' );
        // console.log( this.comercio );
      } else{
        // console.log( 'El comercio está desactivado' );
      }

    });

    // this.obtenerCom( this.refId ).subscribe( param => {

    //   // this.comercio = [];
    //   this.comercio = param.payload.data();
    //   console.log( this.comercio );
    //   console.log( this.comercio.delivery.activo );

    // });

    
    this.obtenerCategorias( this.refId ).subscribe( snap => {
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

    this.obtenerProductos( this.refId ).subscribe( snap => {
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
        



    // ********************************************

    // this.obtenerProductos( this.refId ).subscribe( snap => {

    //   this.productosSugeridos = [];
    //   this.productos = [];

    //   snap.forEach( param => {
    //     if( param.payload.doc.data().sugerido == true ){
    //       this.productosSugeridos.push({
    //         id: param.payload.doc.id,
    //         data: param.payload.doc.data()
    //       });
    //     } else{
    //       this.productos.push({
    //         id: param.payload.doc.id,
    //         data: param.payload.doc.data()
    //       });
    //     }
    //   });

    // });

  }



  // MÉTODOS ************************************
  private obtenerComercio( comercioId: string ){
    return this._co.getCom( comercioId ).valueChanges();
  }

  private obtenerCom( documentId: string ){
    return this._co.getComercio( documentId );
  }

  private obtenerCategorias( documentId: string ){
    return this._co.getCategorias( documentId );
  }

  private obtenerProductos( documentId: string ){
    return this._co.getProductos( documentId );
  }

  public cargarModal( param:any ){
    this.producto.id = param.id;
    this.producto.img = param.foto;
    this.producto.nombre = param.nombre
    this.producto.ingredientes = param.ingredientes
    this.producto.precio = param.precio
    this.producto.precioTotal = param.precio;
    this.producto.cant = 1;
  }

  public sumarCantidad(){
    if( this.producto.cant >= 10 ){
      // console.log("maximo");
    } else{
      this.producto.cant = parseInt( this.producto.cant ) + 1;
      this.producto.precioTotal = parseInt( this.producto.precio ) * this.producto.cant;
    }    
  }

  public restarCantidad(){
    if( this.producto.cant == 1 ){
      // console.log("minimo");
    } else{
      this.producto.cant = parseInt( this.producto.cant ) - 1;
      this.producto.precioTotal = parseInt( this.producto.precio ) * this.producto.cant;
    }
  }

  public agregarProducto( prod:any, nota:string ){
    this._cs.addProducto( prod, nota );
  }

  private verCarrito(){
    this.router.navigate(['/carrito', this.refId]);
  }

}
