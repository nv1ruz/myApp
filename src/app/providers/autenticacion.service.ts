import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private usuarioNew:any = {};
  private bandera:boolean = false;

  constructor( public afAuth: AngularFireAuth, private afs: AngularFirestore ) { 

    this.afAuth.authState.subscribe( user => {

      if( user ){

        if( user.photoURL ){
          this.usuarioNew.foto = user.photoURL;
        } else{
          this.usuarioNew.foto = "/src/assets/img/auth/noavatar.jpg"
        }
        if( user.displayName ){
          this.usuarioNew.nick = user.displayName;
        } else{
          this.usuarioNew.nick = 'Usuario';
        }
        if( user.phoneNumber ){
          this.usuarioNew.movil = user.phoneNumber;
        } else{
          this.usuarioNew.movil = '';
        }
        this.usuarioNew.nombre = '';
        this.usuarioNew.apellido = '';
        this.usuarioNew.email = user.email;
        this.usuarioNew.uid = user.uid;
        this.usuarioNew.typeAcc = 1;
        this.usuarioNew.idCom = '';

        this.bandera = true;
        
        if( this.bandera ){
          this.addUsuario( this.usuarioNew.uid );
        }

      } else{

        this.bandera = false
        return;

      }

    });

  }



  // MÉTODOS ***************************************


  // inicia sesión el usuario con algun proveedor
  public logIn( proveedor: string, email:string, pass:string ){
    if( proveedor == 'google' ){
      return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    } else if( proveedor == 'email' ){
      this.afAuth.auth.signInWithEmailAndPassword( email, pass ).catch( function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if( error ){
          console.log( errorMessage );
        }
        // ...
      });
    } else if( proveedor == 'facebook'){
      console.log( "El codigo todavía no está desarrollado" );
    }
  }  

  // cierra sesión del usuario
  public logOut(){
    return this.afAuth.auth.signOut();
  }

  // registra el usuario por medio de email y contraseña
  public registerEmail( email: string, pass: string ){
    this.afAuth.auth.createUserWithEmailAndPassword( email, pass ).catch( function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if( error ){
        console.log( errorMessage );
      }
      // ...
    });
  }

  // crea el documento del nuevo usuario (Firebase)
  private addUsuario( documentId: string ){
    this.afs.collection( 'usuarios' ).doc( documentId ).get().subscribe( doc => {
      if( doc.exists ){
        // console.log( "Document data:", doc.data() );
      } else{
        console.log( "No existe el documento" );
        this.afs.collection( 'usuarios' ).doc( this.usuarioNew.uid ).set( this.usuarioNew );
        this.afs.collection( 'usuarios' ).doc( this.usuarioNew.uid )
                .collection( 'pedidos' ).add({});
        this.afs.collection( 'usuarios' ).doc( this.usuarioNew.uid )
                .collection( 'direcciones' ).add({});
        console.log("Documento creado");
      }
    });
  }

}