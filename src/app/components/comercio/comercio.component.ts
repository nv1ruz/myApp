import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../providers/firebase.service';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';

import { CarritoService } from '../../providers/carrito.service';
import { ComercioService } from '../../providers/comercio.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent implements OnInit {

  public refId:string;
  public comercio: any = {};
  public producto:any = {};
  public productosSugeridos = [];
  public productos = [];
  // private vinculo: boolean = false;

  constructor( private _co: ComercioService, private _cs: CarritoService, public _fs: FirebaseService, private router: Router, private activatedRoute: ActivatedRoute ) {

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    })

  }

  ngOnInit() {
    

    this.obtenerComercio( this.refId ).subscribe( param => {

      this.comercio = [];
      this.comercio = param.payload.data();

    });

    // ********************************************

    this.obtenerProductos( this.refId ).subscribe( snap => {

      this.productosSugeridos = [];
      this.productos = [];

      snap.forEach( param => {
        if( param.payload.doc.data().sugerido == true ){
          this.productosSugeridos.push({
            id: param.payload.doc.id,
            data: param.payload.doc.data()
          });
        } else{
          this.productos.push({
            id: param.payload.doc.id,
            data: param.payload.doc.data()
          });
        }
      });

    });

    // ********************************************







    // // +info
    // $('.collapse').collapse();
    

    // // obtiene y almacena los datos de un comercio(ID)
    // this._fs.getComercio( this.refId ).subscribe( datos => {
    //   this.comercio = datos.payload.data();
    //   // console.log(this.comercio);

    //   // vincular comercio y usuario
    //   if( this.comercio.uid == this._fs.usuario.uid ){
    //     this.vinculo = true;
    //     console.log("Existe un vínculo");
    //   } else{
    //     this.vinculo = false;
    //     console.log("No existe vínculo");
    //   }

    //   if( this.comercio.estado == true ){
    //     this.comercio.estado = 'Abierto';
    //   } else{
    //     this.comercio.estado = 'Cerrado';
    //   }      
    // });

    // // obtiene y almacena los productos de un comercio(ID)
    // this._fs.getProductos( this.refId ).subscribe( (prodSnapShot) => {
    //   this.productos = [];
    //   prodSnapShot.forEach( (productosData: any) => {
    //     this.productos.push({
    //       id: productosData.payload.doc.id,
    //       data: productosData.payload.doc.data()
    //     });
    //   })
    //   // console.log(this.productos);
    // });

    // // obtiene y almacena los productos sugeridos de un comercio(ID)
    // this._fs.getProductos( this.refId ).subscribe( (prodSnapShot) => {
    //   this.productosSugeridos = [];
    //   prodSnapShot.forEach( (productosData: any) => {        
    //     if( productosData.payload.doc.data().sugerido == true ){
    //       // console.log(`${productosData.payload.doc.data().nombre} sugerido`);
    //       this.productosSugeridos.push({
    //         id: productosData.payload.doc.id,
    //         data: productosData.payload.doc.data()
    //       });
    //     }else{
    //       // console.log(`${productosData.payload.doc.data().nombre} no sugerido`);
    //     }
    //   })
    //   // console.log(this.productosSugeridos);
    // });

   

  }

  // cargarProducto( param ){
  //   this.producto.id = param.id;
  //   this.producto.img = param.data.img;
  //   this.producto.nombre = param.data.nombre
  //   this.producto.ingredientes = param.data.ingredientes
  //   this.producto.precio = param.data.precio
  //   this.producto.precioTotal = param.data.precio;
  //   this.producto.cant = 1;
  //   // console.log( this.producto );
  // }



  // // agrega el producto al carrito
  // agregar( producto, text ){
  //   this._cs.addProducto( producto, text );
  // }

  // verComercio(){
  //   this.router.navigate(['/carrito', this.refId]);
  // }






  // MÉTODOS ************************************

  private obtenerComercio( documentId: string ){
    return this._co.getComercio( documentId );
  }

  private obtenerProductos( documentId: string ){
    return this._co.getProductos( documentId );
  }

  private cargarModal( param:any ){
    this.producto.id = param.id;
    this.producto.img = param.data.img;
    this.producto.nombre = param.data.nombre
    this.producto.ingredientes = param.data.ingredientes
    this.producto.precio = param.data.precio
    this.producto.precioTotal = param.data.precio;
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
