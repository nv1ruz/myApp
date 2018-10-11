import { Component } from '@angular/core';

import { FirebaseService } from './providers/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public _opened: boolean = false;
  private refUID: string;
  public usuario:any = {};
  
  constructor( public _fs: FirebaseService ) { 

    // observador de estado de autenticación
    this._fs.afAuth.authState.subscribe( user => {
      if(user){
        this.refUID = user.uid;
        // obtiene el domuento del usuario desde FireBase
        this.getUsuario( this.refUID ).subscribe( data => {
          this.usuario = data.payload.data();
          // console.log( this.usuario );
        });
      } else{
        console.log( "No existe el usuario" );
      }
    });
  }
 
 
  public _toggleOpened() {
    this._opened = !this._opened;
  }

  private getUsuario( ref: string ){
    return this._fs.getDatosUsuario( ref );
  }

}
