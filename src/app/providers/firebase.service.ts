import { Injectable } from '@angular/core';

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

  constructor( public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore ) {

    this.afAuth.authState.subscribe( user => {
      console.log( 'Estado del usuario: ', user );
      if( !user ){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.foto = user.photoURL
      this.usuario.email = user.email
      // setTimeout( ()=> this.router.navigate(['home']), 5000 );

    } )

  }

  // login del usuario
  login( proveedor: string ) {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
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

}
