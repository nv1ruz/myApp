import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;

import { ComercioService } from '../../providers/comercio.service';
import { CarritoService } from '../../providers/carrito.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public visible: boolean = false;
  public refId:string;
  public comercio:any = {};
  public precioTotal:number = 0;
  public iduser: string = this._fs.usuario.uid;

  // Validacion de Campos
  rForm: FormGroup;
  calle:string = '';
  numero:string = '';
  barrio:string = '';

  public domicilios = [];

  constructor( public _cs: CarritoService, private _co: ComercioService, private router: Router, private activatedRoute: ActivatedRoute, private _fs: FirebaseService, private _fb: FormBuilder ) { 

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    });    

    // Validacion de Campos 
    this.rForm = _fb.group({
      'calle': [null, Validators.compose([Validators.required, Validators.maxLength(50)]) ],
      'numero': [null, Validators.compose([Validators.required, Validators.maxLength(10)]) ],
      'barrio': [null, Validators.compose([Validators.required, Validators.maxLength(50)]) ]
    })

  }

  ngOnInit() {

    this.sumarTotal();

    // ********************************************

    this.obtenerComercio( this.refId ).subscribe( param => {

      this.comercio = [];
      this.comercio = param.payload.data();

    });

    // ********************************************
    this.getDomicilios().subscribe( (snap) => {
      console.log( snap );
      if( snap.length > 0){
        console.log("existen direcciones");
        this.domicilios = [];
        snap.forEach( (data: any) => {
          // console.log( data.payload.doc.data() );
          this.domicilios.push({
            id: data.payload.doc.id,
            // data: data.payload.doc.data(),
            calle: data.payload.doc.data().calle,
            numero: data.payload.doc.data().numero,
            barrio: data.payload.doc.data().barrio,
            cp: '5380',
            provincia: 'La Rioja',
            ciudad: 'Chamical'
            // cp: data.payload.doc.data().cp,
            // provincia: data.payload.doc.data().provincia,
            // ciudad: data.payload.doc.data().ciudad
          });
        });
        // console.log(this.domicilios);
      } else{
        console.log( 'No existe ninguna direccion' );
      }
    });
  }

  toggle(){
    this.visible = !this.visible;
  }

  getDomicilios(){
    return this._fs.afs.collection( 'usuarios' ).doc( this.iduser)
    .collection('direcciones').snapshotChanges();
  }

  guardarDomicilio( cal: string, num: string, pis: string, ent: string, bar: string, ref: string ){
    this._fs.afs.collection( 'usuarios' ).doc( this._fs.usuario.uid )
    .collection( 'direcciones' ).add({
      calle: cal,
      numero:  num,
      pisoDepto: pis,
      entreCalles: ent,
      barrio: bar,
      referencias: ref,
      cp: '5380',
      provincia: 'La Rioja',
      ciudad: 'Chamical'
      // cp: cp,
      // provincia: pro,
      // ciudad: ciu
    }).then( function() {
      console.log( "El documento se guardó correctamente");
    }).catch( function(error) {
      console.log( "Hubo un error al guardar el documento: ", error);
    });
  }

  clearForm() { 
    this.rForm.reset({ 
      'calle': '', 
      'numero': '',
      'barrio': ''
    }); 
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

  private nuevaDireccion(){
    this.router.navigate(['/direccion']);
  }

}
