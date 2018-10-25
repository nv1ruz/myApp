import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FirebaseService } from '../../providers/firebase.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../providers/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

    // (AGM) Angular Google Maps
    public lat: number = -30.361148;
    public lng: number = -66.314116;
    public zm: number = 15;
  
    public userId: string;
    public domicilios = []; 
    public marcador:{ lat: number, lng: number };  

    public max:boolean = false;
  
    // Validacion de Campos
    rForm: FormGroup;
    calle:string = '';
    numero:string = '';
    barrio:string = '';

  constructor( public ap: AppComponent, private _fs: FirebaseService , private _fb: FormBuilder, private _us: UsuarioService, private router: Router ) {

    this.marcador = {
      lat: 0,
      lng: 0
    }

    // Validacion de Campos
    this.rForm = _fb.group({
      'calle': [null, Validators.compose([Validators.required, Validators.maxLength(50)]) ],
      'numero': [null, Validators.compose([Validators.required, Validators.maxLength(10)]) ],
      'barrio': [null, Validators.compose([Validators.required, Validators.maxLength(50)]) ]
    });

  }

  ngOnInit() {

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.userId = user.uid;
        this.obtenerDomicilios( this.userId ).subscribe( (snap) => {
          if( snap.length >= 0){
            // console.log("existen direcciones");
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
              });
            });
            
            if( snap.length == 5 ){
              this.max = true;
            } else{
              this.max = false;
            }
            
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

  private irDireccion(){
    this.router.navigate(['/direccion']);
  }

  private actualizar( id: string ){
    this.router.navigate(['/direccion', id]);
  }


  clearForm() { 
    this.rForm.reset({ 
      'calle': '', 
      'numero': '',
      'barrio': ''
    }); 
  }  


  public borrarDomicilio( documentId: string , domicilioId: string ){
    return this._us.deleteDomicilio( documentId, domicilioId );
  }
  


}

