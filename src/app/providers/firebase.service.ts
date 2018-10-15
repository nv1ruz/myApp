import { Injectable, OnInit } from '@angular/core';

// firebase auth
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public usuario: any = {};
  private bandera:boolean = false;

  constructor( public afAuth: AngularFireAuth, private router: Router, public afs: AngularFirestore ) {

    this.afAuth.authState.subscribe( user => {
      // console.log( 'Estado del usuario: ', user );
      if( !user ){
        this.bandera = false
        return;
      }

      // creacion del objeto usuario
      if( !user.photoURL ){
        this.usuario.foto = "/src/assets/img/auth/noavatar.jpg"
      } else{
        this.usuario.foto = user.photoURL;
      }
      if( user.displayName ){
        this.usuario.nick = user.displayName;
      } else{
        var NewUserId = user.uid.substring(8,0);
        this.usuario.nick = 'Usuario'+NewUserId;
        // this.usuario.nombre = user.displayName;
      }
      this.usuario.nombre = '';
      this.usuario.apellido = '';
      this.usuario.email = user.email;
      if( user.phoneNumber ){
        this.usuario.movil = user.phoneNumber;
      } else{
        this.usuario.movil = '';
      }
      this.usuario.uid = user.uid;
      
      // setTimeout( ()=> this.router.navigate(['home']), 3000 );
      this.bandera = true;
      
      if( this.bandera ){
        this.docUsuario( this.usuario.uid );
      }

    });
    
    
  }

  // registrar cuenta con email y contraseña
  registroEmail( email: string, pass: string ){
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

  // login con email y contraseña
  loginEmailPass( email: string, pass: string ){
    this.afAuth.auth.signInWithEmailAndPassword( email, pass ).catch( function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if( error ){
      console.log( errorMessage );
    }
    // ...
    });
  }

  // login del usuario
  login( proveedor: string ) {    
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  // logout del usuario
  logout() {
    this.usuario = {}; //Restaura el objeto usuario
    this.afAuth.auth.signOut();
  }

  // obtiene la coleccion de comercios desde FireBase
  public getComercios(){
    return this.afs.collection('comercios').snapshotChanges();
  }

  // obtiene el documento de un comercio(ID) desde FireBase
  public getComercio( documentId: string ){
    return this.afs.collection('comercios').doc(documentId).snapshotChanges();
  }

  // obtiene todos los productos de un comercio(ID) desde FireBase
  public getProductos( documentId: string ){
    return this.afs.collection('comercios').doc(documentId)
                  .collection('productos').snapshotChanges();
  }

  // crea la estructura o documento de un usuario
  private docUsuario( documentId: string ){
    this.afs.collection( 'usuarios' ).doc( documentId ).get().subscribe( doc => {
      if( doc.exists ){
        // console.log( "Document data:", doc.data() );
      } else{
        console.log( "No existe el documento" );
        this.afs.collection( 'usuarios' ).doc( this.usuario.uid ).set( this.usuario );
        this.afs.collection( 'usuarios' ).doc( this.usuario.uid )
                .collection( 'pedidos' ).add({});
        this.afs.collection( 'usuarios' ).doc( this.usuario.uid )
                .collection( 'direcciones' ).add({});
        console.log("Documento creado");
      }
    });
  }

  public getDatosUsuario( documentId: string ){
    return this.afs.collection( 'usuarios' ).doc( documentId ).snapshotChanges();
  }


}
