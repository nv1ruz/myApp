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

  // obtiene la colección de categorías de un comercio específico (Firebase)
  public getCategorias( documentId: string ){
    return this.afs.collection( 'comercios' ).doc( documentId )
                    .collection( 'categorias' ).snapshotChanges();
  }

  public pushCategoria( documentId: string, nombre: string ){
    return this.afs.collection( 'comercios' ).doc( documentId )
                    .collection( 'categorias' ).add({
                      nombre: nombre
                    }).then( function() {
                      console.log( "El documento se guardó correctamente" );
                    }).catch( function( error ) {
                      console.log( "Hubo un error al guardar el documento: ", error);
                    });
  }

  public deleteCategoria( documentId: string, categoriaId: string ){
    return this.afs.collection( 'comercios' ).doc( documentId )
                    .collection( 'categorias' ).doc( categoriaId ).delete()
  }

}
