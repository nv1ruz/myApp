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

  // obtiene el documento de un producto específico (Firebase)
  public getProducto( comId: string, prodId: string ){    
    return this.afs.collection( 'comercios' ).doc( comId )
                    .collection( 'productos' ).doc( prodId ).snapshotChanges();
  }

  public pushProducto( comercioId: string, nombre: string, ingredientes: string, categoria: string, precio: number ){
    return this.afs.collection( 'comercios' ).doc( comercioId )
                    .collection( 'productos' ).add({
                      img: 'https://previews.123rf.com/images/olgaolmix/olgaolmix1701/olgaolmix170100144/70737458-conjunto-de-comida-r%C3%A1pida-dibujado-a-mano-vector-de-recogida-chatarra-alimentos-poco-saludables-hambur.jpg',
                      nombre: nombre,
                      ingredientes: ingredientes,
                      categoria: categoria,
                      precio: precio
                    });
  }

  public updProducto( comercioId: string, prodId: string, nombre: string, ingredientes: string, categoria: string, precio: number ){
    return this.afs.collection( 'comercios' ).doc( comercioId )
                    .collection( 'productos' ).doc( prodId ).update({
                      nombre: nombre,
                      ingredientes: ingredientes,
                      categoria: categoria,
                      precio: precio
                    })
                    .then( function() {
                      console.log( "Documento actualizado con exito" );
                    })
                    .catch( function(error) {
                      console.log( "Error al actualizar el documento" );
                    });
  }

  public deleteProducto( comercioId: string, prodId: string ){
    return this.afs.collection( 'comercios' ).doc( comercioId )
                    .collection( 'productos' ).doc( prodId ).delete();
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
