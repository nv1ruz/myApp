import { Injectable } from '@angular/core';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito = [];

  constructor() { 

    this.cargarStorage();

  }



  // agregarProducto( idx, nom, pre ){
  //   this.carrito.push({
  //     id: idx,
  //     nombre: nom,
  //     precio: pre
  //   });
    
  //   this.guardarStorage();
  //   console.log( this.carrito );
  // }

  agregarProducto( prod, text ){

    let existe:boolean = false;

    this.carrito.forEach( data => {
      if( data.id == prod.id ){
        existe = true;
        data.cant += prod.cant;
        console.log(`${data.nombre} cantidad actualizada`);
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
      console.log(`${prod.nombre} agregado al carrito`);
    }
    
    // this.guardarStorage();
    // console.log("Productos del carrito :", this.carrito );
  }


  borrarProducto(idx: string){
    this.carrito = this.carrito.filter( data =>{
      return data.id !== idx;
    });
    
    // console.log(this.carrito);
    // this.guardarStorage();

  }


  guardarStorage(){
    localStorage.setItem('data', JSON.stringify( this.carrito ));
  }


  cargarStorage(){
    // if( localStorage.getItem('data') ){
    //   this.carrito = JSON.parse( localStorage.getItem('data') );
    //   console.log(this.carrito);
    // } else{
    //   this.carrito = [];
    // }
    this.carrito = [];
  }


}
