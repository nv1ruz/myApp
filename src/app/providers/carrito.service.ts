import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito = [];

  constructor() { 

    this.cargarStorage();

  }



  agregarProducto( idx, nom, pre ){
    this.carrito.push({
      id: idx,
      nombre: nom,
      precio: pre
    });
    
    this.guardarStorage();
    console.log( this.carrito );
  }


  borrarProducto(idx: string){
    this.carrito = this.carrito.filter( data =>{
      return data.id !== idx;
    });
    
    // console.log(this.carrito);
    this.guardarStorage();

  }


  guardarStorage(){
    localStorage.setItem('data', JSON.stringify( this.carrito ));
  }


  cargarStorage(){
    if( localStorage.getItem('data') ){
      this.carrito = JSON.parse( localStorage.getItem('data') );
      console.log(this.carrito);
    } else{
      this.carrito = [];
    }
  }


}
