import { Component, OnInit } from '@angular/core';
declare var $:any;

import { ComercioService } from '../../providers/comercio.service';
import { CarritoService } from '../../providers/carrito.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  public refId:string;
  public comercio:any = {};
  public precioTotal:number = 0;

  constructor( public _cs: CarritoService, private _co: ComercioService, private activatedRoute: ActivatedRoute ) { 

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    });    

  }

  ngOnInit() {

    this.sumarTotal();

    // ********************************************

    this.obtenerComercio( this.refId ).subscribe( param => {

      this.comercio = [];
      this.comercio = param.payload.data();

    });

    // ********************************************
    
  }



  // MÉTODOS ***************************************

  private obtenerComercio( documentId: string ){
    return this._co.getComercio( documentId );
  }

  private sumarTotal(){

    this.precioTotal = 0;

    if( $('p.valordelivery').is(":visible") ){
      this._cs.carrito.forEach( param => {
        this.precioTotal += parseInt( param.preTot );
      });
      this.precioTotal += this.comercio.deliveryPrecio;
    }else{
      this._cs.carrito.forEach( param => {
        this.precioTotal += parseInt( param.preTot );
      });
    }

  }

  private sumarCantidad( prod ){
    if( prod.cant >= 10 ){
      // console.log("maximo");
    } else{
      prod.cant = parseInt( prod.cant ) + 1;
      prod.preTot = parseInt( prod.pre ) * prod.cant;
    }    
    this.sumarTotal();
  }

  private restarCantidad( prod ){
    if( prod.cant == 1 ){
      // console.log("minimo");
    } else{
      prod.cant = parseInt( prod.cant ) - 1;
      prod.preTot = parseInt( prod.pre ) * prod.cant;
    }
    this.sumarTotal();
  }

  private eliminarProducto( id: string ){
    this._cs.deletProducto( id );
    this.sumarTotal();
  }

  private mostrarOcultarDireccion(){

    // Mostrar-Ocultar Direccion y Precio Delivery
    $('#cambiarentrega').change(function(){
      var valorCambiado =$(this).val();
      // console.log(valorCambiado);
      if(valorCambiado == '2'){
        // console.log("Retiro por el local: opción", valorCambiado);
        $('#direcc').css('display','none');
        $('p.direcc').css('display','none');
        $('p.valordelivery').css('display','none');
      }
      else if(valorCambiado == '1')
      {
        // console.log("Delivery: opción", valorCambiado);
        $('#direcc').css('display','block');
        $('p.direcc').css('display','block');
        $('p.valordelivery').css('display','block');      
      }
    });  

  }

}
