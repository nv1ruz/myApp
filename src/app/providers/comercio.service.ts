import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  constructor( public afs: AngularFirestore ) { }



  // MÉTODOS ***************************************

  // cambia el estado (abierto/cerrado) del comercio (Firebase)
  public estadoComercio( comercioId: string, estado:boolean ){
    this.afs.collection( 'comercios' ).doc( comercioId ).update({
                          abierto: estado
                        })
                        .then( function() {
                          console.log( "Documento actualizado con exito" );
                        })
                        .catch( function(error) {
                          console.log( "Error al actualizar el documento" );
                        });
  }

  // cambia el estado (Si/No) del Delivery del comercio (Firebase)
  public esDelivery( comercioId: string, estado:boolean ){
    this.afs.collection( 'comercios' ).doc( comercioId ).update({
                          delivery: estado
                        })
                        .then( function() {
                          console.log( "Documento actualizado con exito" );
                        })
                        .catch( function(error) {
                          console.log( "Error al actualizar el documento" );
                        });
  }

  // obtiene el documento de un comercio específico (Firebase)
  public getCom( documentId: string ){
    return this.afs.collection( 'comercios' ).doc( documentId );
  }

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

  // obtiene la colección de productos de un comercio con la categoría especificada (Firebase)
  public getProductosSegunCategoria( comercioId: string, categoriaNombre: string ){
    return this.afs.collection( 'comercios' ).doc( comercioId )
                 .collection( 'productos', ref => ref.where( 'categoria', '==', categoriaNombre ) ).snapshotChanges();
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

  public updProductoEstado( comercioId: string, productoId: string ){
    return this.afs.collection( 'comercios' ).doc( comercioId )
                    .collection( 'productos' ).doc( productoId );
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

  public getCategoria( documentId: string, categoriaId: string ){
    return this.afs.collection( 'comercios' ).doc( documentId )
                    .collection( 'categorias' ).doc( categoriaId ).snapshotChanges();
  }

  public updCategoria( documentId: string, categoriaId: string, categoriaNombre: string ){
    return this.afs.collection( 'comercios' ).doc( documentId )
                    .collection( 'categorias' ).doc( categoriaId ).update({
                      nombre: categoriaNombre
                    });
  }

  public updCategoriaEstado( comercioId: string, categoriaId: string ){
    return this.afs.collection( 'comercios' ).doc( comercioId )
                    .collection( 'categorias' ).doc( categoriaId );
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
                    .collection( 'categorias' ).doc( categoriaId ).delete();
  }






  public pedidosComercio( comercioId: string ){
    return this.afs.collection( 'comercios' ).doc( comercioId )
                    .collection( 'pedidos' );
  }

  public getDomicilios( refId: string ){
    return this.afs.collection( 'usuarios' ).doc( refId )
                    .collection('direcciones').snapshotChanges();
  }



}
