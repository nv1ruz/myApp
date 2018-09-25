import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../providers/carrito.service';

declare var $:any;
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private _cs: CarritoService) { }

  ngOnInit() {
    


    $(document).ready(function(){
      // $('.collapsible').collapsible();
    });

    $(document).ready(function(){
      // $('select').formSelect();
    });

    //Cantidad
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
