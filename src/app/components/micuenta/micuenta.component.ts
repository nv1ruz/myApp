import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';


import { FirebaseService } from '../../providers/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
// import { userInfo } from 'os';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.css']
})
export class MicuentaComponent implements OnInit {

  private refUID: string;
  public usuario:any = {};



  constructor( public ap: AppComponent, public _fs: FirebaseService) { 



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

  ngOnInit() {  }

  private getUsuario( ref ){
    return this._fs.getDatosUsuario( ref );
  }

  actualizarDatos(nic: string, nom: string, ape: string, mov: string){
    let refDoc = this._fs.afs.collection( 'usuarios' ).doc( this.refUID );
    refDoc.update({
      nick: nic,
      nombre: nom,
      apellido: ape,
      movil: mov
    })
    .then( function() {
      console.log( "Documento actualizado correctamente");
    })
    .catch( function(error) {
      console.log( "Error al actualizar documento: ", error);
    });
  }

}
