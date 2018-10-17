import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../../providers/usuario.service';


@Component({
  selector: 'app-domicilios',
  templateUrl: './domicilios.component.html',
  styleUrls: ['./domicilios.component.css']
})
export class DomiciliosComponent implements OnInit {

  // (AGM) Angular Google Maps
  lat: number = -30.361148;
  lng: number = -66.314116;
  zm: number = 15;

  public visible: boolean = false;
  public txtBtn: string = 'Agregar dirección';
  public domicilios = []; 
  public userId: string;
  public marcador:{ lat: number, lng: number };  

  // Validacion de Campos
  rForm: FormGroup;
  calle:string = '';
  numero:string = '';
  barrio:string = '';

  constructor( private _fs: FirebaseService , private _fb: FormBuilder, private _us: UsuarioService) {

    this.marcador = {
      lat: 0,
      lng: 0
    }

    // Validacion de Campos
    this.rForm = _fb.group({
      'calle': [null, Validators.compose([Validators.required, Validators.maxLength(50)]) ],
      'numero': [null, Validators.compose([Validators.required, Validators.maxLength(10)]) ],
      'barrio': [null, Validators.compose([Validators.required, Validators.maxLength(50)]) ]
    })

   }


   
  ngOnInit() {

    this._us.afAuth.authState.subscribe( user => {

      if( user ){
        this.userId = user.uid;

        this.obtenerDomicilios( this.userId ).subscribe( (snap) => {
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


      } else{
        return;
      }

    });

          
    
  }



  // MÉTODOS ***************************************

  private agregarMarcador( evento ){
    const coords: { lat: number, lng: number } = evento.coords;
    this.marcador = { lat: coords.lat, lng: coords.lng };
    console.log(this.marcador);
  }

  private guardarDomicilio( refId:string, cal: string, num: number, pis: string, ent: string, bar: string, ref: string, lat: number, lng: number ){
    return this._us.pushDireccion( refId, cal, num, pis, ent, bar, ref, lat, lng );
  }

  private obtenerDomicilios( refId: string ){
    return this._us.getDomicilios( refId );
  }

  public toggle(){
    if( this.visible ){
      this.txtBtn = 'Agregar dirección';
    } else{
      this.txtBtn = 'Volver';
    }
    this.visible = !this.visible;
  }

  clearForm() { 
    this.rForm.reset({ 
      'calle': '', 
      'numero': '',
      'barrio': ''
    }); 
  } 

}
