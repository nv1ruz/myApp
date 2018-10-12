import { Component } from '@angular/core';

import { FirebaseService } from './providers/firebase.service';
import { AutenticacionService } from './providers/autenticacion.service';
import { UsuarioService } from './providers/usuario.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public _opened: boolean = false;
  private refUID: string;
  public usuario:any = {};
  public exist:boolean = false;
  
  constructor( private _as: AutenticacionService, private _us: UsuarioService ) { 

    // observador de estado de autenticación
    this._as.afAuth.authState.subscribe( user => {

      if( user ){        
        this.exist = true;
        this.refUID = user.uid;
        // obtiene el documento del usuario desde FireBase
        this.obtenerDocUsuario( this.refUID ).subscribe( param => {
          this.usuario = param.payload.data();
        });
      } else{
        this.exist = false;
        console.log( "No existe el usuario" );
      }

    });
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

}
