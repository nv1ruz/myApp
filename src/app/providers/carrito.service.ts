import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito = [];

  constructor() { }



  // MÉTODOS ***************************************

  // añade o actualiza el producto al carrito
  public addProducto( prod: any, text: string ){

    let existe:boolean = false;

    this.carrito.forEach( param => {

      if( param.id == prod.id ){
        existe = true;
        param.cant += prod.cant;
        // console.log(`${param.nombre} cantidad actualizada`);
      } else{
        // console.log("no existe el producto");
      }

    });

    if( !existe ){
      this.carrito.push( {
        id: prod.id,
        img: prod.img,
        nombre: prod.nombre,
        ing: prod.ingredientes,
        cant: prod.cant,
        pre: prod.precio,
        preTot: prod.precioTotal,
        nota: text
      } );
      // console.log(`${prod.nombre} agregado al carrito`);
    }   
     
  }

  // elimina el producto del carrito
  public deletProducto(idx: string){
    this.carrito = this.carrito.filter( data =>{
      return data.id !== idx;
    });
  }

}
