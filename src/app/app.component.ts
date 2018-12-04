import { Component } from '@angular/core';

import { FirebaseService } from './providers/firebase.service';
import { AutenticacionService } from './providers/autenticacion.service';
import { UsuarioService } from './providers/usuario.service';
import { ComercioService } from './providers/comercio.service';


import { Router, RoutesRecognized  } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public _opened: boolean = false;
  public refUID: string;
  public usuario:any = {};
  public exist:boolean = false;
  public comerciante:boolean = false;

  public comercio: any = {};
  public estadoo:boolean = false;

  public prevUrl: string;
  
  constructor( private _as: AutenticacionService, private _us: UsuarioService,private _co: ComercioService, private router: Router ) { 

    // captura la url previa
    this.router.events
    .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
    ).subscribe((e: any) => {
        // console.log(e[0].urlAfterRedirects); // previous url
        this.prevUrl = e[0].urlAfterRedirects;
    });

    // observador de estado de autenticación
    this._as.afAuth.authState.subscribe( user => {

      if( user ){        
        this.exist = true;
        this.refUID = user.uid;
        // obtiene el documento del usuario desde FireBase
        this.obtenerDocUsuario( this.refUID ).subscribe( param => {
          this.usuario = param.payload.data();  
          if( this.usuario.typeAcc == 2 ){
            console.log( "Tipo de cuenta: Comerciante" );
            this.comerciante = true;

            this.obtenerComercio( this.usuario.idCom ).subscribe( param => {
              this.comercio = [];
              this.comercio = param.payload.data();
              if(this.comercio.abierto){
                this.estadoo = true;
              } else {
                this.estadoo = false;
              }

            });
          } else{
            console.log( "Otro tipo de cuenta" );
            this.comerciante = false;
          }
        });
      } else{
        this.exist = false;
        console.log( "No existe el usuario" );
      }

    });

  }

  ngOnInit(){

    // this.obtenerComercio( 'ncRxByAIs5qd8i54BsXf' ).subscribe( param => {
    //   this.comercio = [];
    //   this.comercio = param.payload.data();
    //   if(this.comercio.estado == true){
    //     this.estadoo = true;
    //   } else {
    //     this.estadoo = false;
    //   }
    // });
    
  }
 
 
  public _toggleOpened() {
    this._opened = !this._opened;
  }

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  private cerrarSesion(){
    return this._as.logOut();
  }

  public obtenerComercio( documentId: string ){
    return this._co.getComercio( documentId );
  }

}
