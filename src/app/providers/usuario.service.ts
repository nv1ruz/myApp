import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private afs: AngularFirestore ) { }



  // MÉTODOS ***************************************

  public getDocUsuario( documentId: string ){
    return this.afs.collection( 'usuarios' ).doc( documentId ).snapshotChanges();
  }


}
