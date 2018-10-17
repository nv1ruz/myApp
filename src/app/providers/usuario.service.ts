import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private afs: AngularFirestore, public afAuth: AngularFireAuth ) { }



  // MÉTODOS ***************************************

  public getDocUsuario( documentId: string ){
    return this.afs.collection( 'usuarios' ).doc( documentId ).snapshotChanges();
  }

  public getDomicilios( refId: string ){
    return this.afs.collection( 'usuarios' ).doc( refId )
    .collection('direcciones').snapshotChanges();
  }

}
