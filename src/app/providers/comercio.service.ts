import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  constructor( public afs: AngularFirestore ) { }



  // MÉTODOS ***************************************

  // obtiene el documento de un comercio específico (Firebase)
  public getComercio( documentId: string ){
    return this.afs.collection( 'comercios' ).doc( documentId ).snapshotChanges();
  }

  // obtiene la colección de comercios (Firebase)
  public getComercios(){
    return this.afs.collection( 'comercios' ).snapshotChanges();
  }

  // obtiene la colección de productos de un comercio específico (Firebase)
  public getProductos( documentId: string ){
    return this.afs.collection( 'comercios' ).doc( documentId )
                    .collection( 'productos' ).snapshotChanges();
  }

}
