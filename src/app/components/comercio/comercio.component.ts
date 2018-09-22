import { Component, OnInit } from '@angular/core';
declare var $:any;
import { FirebaseService } from '../../providers/firebase.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor( public _fs: FirebaseService, private activatedRoute: ActivatedRoute, public _cs: CarritoService ) {

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    })

  }

  ngOnInit() {
    
    // +info
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
    

    // obtiene y almacena los datos de un comercio(ID)
    this._fs.getComercio( this.refId ).subscribe( datos => {
      this.comercio = datos.payload.data();
      console.log(this.comercio);
      if( this.comercio.estado == true ){
        this.comercio.estado = 'Abierto';
      } else{
        this.comercio.estado = 'Cerrado';
      }
      // if( this.comercio.delivery == true ){
      //   this.comercio.delivery = '- Delivery';
      // } else{
      //   this.comercio.delivery = '';
      // }
      
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

    // Modal Boostrap
    $('#modal1').on('shown.bs.modal', function () { 
    });

    //Modal Materialize
    // $(document).ready(function(){
    //   $('.modal').modal();
    // });

      //Modal: Contador Comentario
      $(document).ready(function() {
        $('input#input_text, textarea#comentario').characterCounter();
      });  

      //Modal: Cantidad Modal
      $(document).ready( function() { 
        var el = $('.test'); 
        function change( amt ) { 
        el.val( parseInt( el.val(), 10 ) + amt ); 
        } 
        $('.up').click( function() { 
          if(el.val()<10){
            change( 1 );
          } else{
          }
        } ); 
        $('.down').click( function() { 
          if(el.val()>1){
            change( -1 ); 
          }
        } ); 
      } ); 



  }

}
