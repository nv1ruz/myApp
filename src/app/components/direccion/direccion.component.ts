import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../providers/usuario.service';
import { ActivatedRoute, Router  } from '@angular/router';


@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

    // (AGM) Angular Google Maps
    lat: number = -30.361148;
    lng: number = -66.314116;
    zm: number = 15;
  
    public txtBtn: string = 'Agregar dirección';
    public domicilios = []; 
    public userId: string;
    public marcador:{ lat: number, lng: number };  
    
    private dirId: string;
    public direccion: any = {};
    private editar:boolean = false;

    public anterior: string;

    // Validacion de Campos
    rForm: FormGroup;
    // calle:string = '';
    // numero:string = '';
    // barrio:string = '';

    calle: string = '';
    numero: string = '';
    piso: string = '';
    entre: string = '';
    barrio: string = '';
    ref: string = '';

  constructor( public ap: AppComponent, private _fb: FormBuilder, private _us: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute ) { 
    
    
    // string con la urlAnterior
    this.anterior = this.ap.prevUrl;




    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.dirId = param.id;
      // console.log(this.dirId);
      if( this.dirId ){
        // console.log("existe un parametro");
        this.editar = true;
      } else{
        // console.log("no existe un parametro");
        this.editar = false;
      }
    })

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.userId = user.uid;
      } else{
        return;
      }
    });

    this.marcador = {
      lat: 0,
      lng: 0
    }

    // Validacion de Campos
    // this.rForm = _fb.group({
    this.rForm = new FormGroup({
      'calle': new FormControl('', [ Validators.compose([Validators.required, Validators.maxLength(50)]) ]),
      'numero': new FormControl('', [ Validators.compose([Validators.required, Validators.maxLength(10)]) ]),
      'piso': new FormControl(''),
      'entre': new FormControl(''),
      'barrio': new FormControl('', [ Validators.compose([Validators.required, Validators.maxLength(50)]) ]),
      'ref': new FormControl('')
      // 'calle': new FormControl('', [null, Validators.compose([Validators.required, Validators.maxLength(50)]) ]),
      // 'numero': new FormControl('', [null, Validators.compose([Validators.required, Validators.maxLength(10)]) ]),
      // 'barrio': new FormControl('', [null, Validators.compose([Validators.required, Validators.maxLength(50)]) ])
    })

  }
// 
  ngOnInit() { 



    if( this.editar && this.userId ){

      this.obtenerDireccion( this.userId, this.dirId ).subscribe( param => {        
        this.direccion = param.payload.data();
        console.log( this.direccion ); 
        this.zm = 16;
        if( this.direccion.lat == 0 && this.direccion.lng == 0){
          this.lat = -30.361148;
          this.lng = -66.314116;
        } else{
          this.lat = this.direccion.lat;
          this.lng = this.direccion.lng;
          this.marcador = { lat: this.direccion.lat, lng: this.direccion.lng };
        }

        this.rForm.controls['calle'].setValue( this.direccion.calle);
        this.rForm.controls['numero'].setValue( this.direccion.numero);
        this.rForm.controls['piso'].setValue( this.direccion.pisoDepto);
        this.rForm.controls['entre'].setValue( this.direccion.entreCalles);
        this.rForm.controls['barrio'].setValue( this.direccion.barrio);
        this.rForm.controls['ref'].setValue( this.direccion.referencias);
        
      });


    } else{
      return;
    }

  }



  // MÉTODOS ***************************************

  public agregarMarcador( evento ){
    const coords: { lat: number, lng: number } = evento.coords;
    this.marcador = { lat: coords.lat, lng: coords.lng };
    console.log(this.marcador);
  }

  public guardarDomicilio( refId:string, cal: string, num: number, pis: string, ent: string, bar: string, ref: string, lat: number, lng: number ){
    if( this.editar ){
      // console.log("es verdadero");
      this._us.updDireccion( refId, this.dirId, cal, num, pis, ent, bar, ref, lat, lng )
    } else{
      // console.log("es falso");
      this._us.pushDireccion( refId, cal, num, pis, ent, bar, ref, lat, lng );
    }
  }

  private obtenerDomicilios( refId: string ){
    return this._us.getDomicilios( refId );
  }

  private regresar(){
    this.router.navigate(['/direcciones']);
  }

  private obtenerDireccion( uId: string, dId: string ){
    return this._us.getDireccion( uId, dId );
  }

  clearForm() { 
    this.rForm.reset({ 
      'calle': '', 
      'numero': '',
      'barrio': ''
    }); 
  }

  public irAtras(){
    this._us.goBack();
  }

}
