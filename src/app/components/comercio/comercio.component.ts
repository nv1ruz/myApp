import { Component, OnInit } from '@angular/core';
declare var $:any;
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers/firebase.service';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';

import { CarritoService } from '../../providers/carrito.service';


@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent implements OnInit {

  public refId:string;
  public comercio: any = {};
  public productos = [];
  public productosSugeridos = [];
  public producto:any = {};


  constructor( public _fs: FirebaseService, private activatedRoute: ActivatedRoute, private _cs: CarritoService, private router: Router ) {

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    })

  }

  ngOnInit() {
    
    // +info
    $('.collapse').collapse();
    

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

    // obtiene y almacena los productos de un comercio(ID)
    this._fs.getProductos( this.refId ).subscribe( (prodSnapShot) => {
      this.productos = [];
      prodSnapShot.forEach( (productosData: any) => {
        this.productos.push({
          id: productosData.payload.doc.id,
          data: productosData.payload.doc.data()
        });
      })
      // console.log(this.productos);
    });

    // obtiene y almacena los productos sugeridos de un comercio(ID)
    this._fs.getProductos( this.refId ).subscribe( (prodSnapShot) => {
      this.productosSugeridos = [];
      prodSnapShot.forEach( (productosData: any) => {        
        if( productosData.payload.doc.data().sugerido == true ){
          // console.log(`${productosData.payload.doc.data().nombre} sugerido`);
          this.productosSugeridos.push({
            id: productosData.payload.doc.id,
            data: productosData.payload.doc.data()
          });
        }else{
          // console.log(`${productosData.payload.doc.data().nombre} no sugerido`);
        }
      })
      // console.log(this.productosSugeridos);
    });

  }

  cargarProducto( param ){
    this.producto.id = param.id;
    this.producto.img = param.data.img;
    this.producto.nombre = param.data.nombre
    this.producto.ingredientes = param.data.ingredientes
    this.producto.precio = param.data.precio
    this.producto.precioTotal = param.data.precio;
    this.producto.cant = 1;
    console.log( this.producto );
  }

  sumarCantidad(){
    if( this.producto.cant >= 10 ){
      // console.log("maximo");
    } else{
      this.producto.cant = parseInt( this.producto.cant ) + 1;
      // console.log(this.producto.cant);
      this.producto.precioTotal = parseInt( this.producto.precio ) * this.producto.cant;
    }    
  }

  restarCantidad(){
    if( this.producto.cant == 1 ){
      // console.log("minimo");
    } else{
      this.producto.cant = parseInt( this.producto.cant ) - 1;
      // console.log(this.producto.cant);
      this.producto.precioTotal = parseInt( this.producto.precio ) * this.producto.cant;
    }
  }

  // agrega el producto al carrito
  agregar( producto, text ){
    this._cs.agregarProducto( producto, text );
  }

  verComercio(){
    this.router.navigate(['/carrito', this.refId]);
  }

}
