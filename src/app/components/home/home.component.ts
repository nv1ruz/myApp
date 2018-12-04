import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { CarritoService } from '../../providers/carrito.service';
import { ComercioService } from '../../providers/comercio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public comerciosAbiertos = [];
  // public comerciosCerrados = [];
  public comercios = [];

  constructor( public ap: AppComponent, private _co: ComercioService, private _cs: CarritoService, private router: Router) { 

    this._cs.carrito = [];

  } 


  ngOnInit() {

    this.obtenerComercios().subscribe( snap => {

      // this.comerciosAbiertos = [];
      // this.comerciosCerrados = [];
      this.comercios = [];

      snap.forEach( (param:any) => {
        // console.log(param.payload.doc.data().abierto);
        // if( param.payload.doc.data().abierto == true ){
        //   this.comerciosAbiertos.push({
        //     id: param.payload.doc.id,
        //     data: param.payload.doc.data()
        //   });
        // } else{
        //   this.comerciosCerrados.push({
        //     id: param.payload.doc.id,
        //     data: param.payload.doc.data()
        //   });
        // }
        if( param.payload.doc.data().activo ){
          
          this.comercios.push({
            id: param.payload.doc.id,
            data: param.payload.doc.data()
          });

        }

      });

      // console.log( this.comerciosAbiertos );
      // console.log( this.comerciosCerrados );

    });

    // ********************************************






    

    // // obtiene los datos de los comercios y los almacena en un arreglo
    // this._fs.getComercios().subscribe( (comerciosSnapshot) => {
    //   this.comercios = [];
    //   comerciosSnapshot.forEach( (comerciosData: any) => {
    //     this.comercios.push({
    //       id: comerciosData.payload.doc.id,
    //       data: comerciosData.payload.doc.data()
    //     });
    //   })
    //   // console.log(this.comercios);
    // });





    // // obtiene y almacena solo los comercios "abiertos"
    // this._fs.getComercios().subscribe( (comerciosSnapshot) => {
    //   this.comerciosAbiertos = [];
    //   comerciosSnapshot.forEach( (comerciosData: any) =>{
    //     if( comerciosData.payload.doc.data().estado == true ){
    //       // console.log(`${comerciosData.payload.doc.data().nombre} abierto`);
    //       this.comerciosAbiertos.push({
    //         id: comerciosData.payload.doc.id,
    //         data: comerciosData.payload.doc.data()
    //       });
    //     } else{
    //       // console.log(`${comerciosData.payload.doc.data().nombre} cerrado`);
    //     }
    //   })
    //   // console.log(this.comerciosAbiertos);
    // });




    // obtiene y almacena solo los comercios "cerrados"
    // this._fs.getComercios().subscribe( (comerciosSnapshot) => {
    //   this.comerciosCerrados = [];
    //   comerciosSnapshot.forEach( (comerciosData: any) =>{
    //     if( comerciosData.payload.doc.data().estado == false ){
    //       // console.log(`${comerciosData.payload.doc.data().nombre} cerrado`);
    //       this.comerciosCerrados.push({
    //         id: comerciosData.payload.doc.id,
    //         data: comerciosData.payload.doc.data()
    //       });
    //     } else{
    //       // console.log(`${comerciosData.payload.doc.data().nombre} abierto`);
    //     }
    //   })
    //   // console.log(this.comerciosCerrados);
    // });


  }

  // MÉTODOS **********************************

  private verComercio( idx: string ){
    this.router.navigate(['/comercio', idx]);
  }

  private obtenerComercios(){
    return this._co.getComercios();
  }

}
