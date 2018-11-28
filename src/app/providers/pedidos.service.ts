import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor( public afs: AngularFirestore ) { }

  // obtiene el documento de un pedido en específico (Firebase)
  public getPedido(  pedidoId: string ){
    return this.afs.collection( 'pedidos' ).doc( pedidoId );
  }

  // Obtiene la colección productos de un pedido en específico (Firebase)
  public getPedidoProductos( pedidoId: string ){
    return this.afs.collection( 'pedidos' ).doc( pedidoId )
                    .collection( 'productos' );
  }

  // obtiene la colección de pedidos (Firebase)
  public getPedidos(){
    return this.afs.collection( 'pedidos' ).snapshotChanges();
  }

  // obtiene los pedidos de un comercio en específico (Firebase)
  public getPedidosComercio( comercioId: string ){
    return this.afs.collection( 'pedidos', ref => ref.where( 'comercioId', '==', comercioId ) ).snapshotChanges();
  }

  // obtiene los pedidos de un usuario en específico (Firebase)
  public getPedidosUsuario( usuarioId: string ){
    return this.afs.collection( 'pedidos', ref => ref.where( 'usuarioId', '==', usuarioId ) ).snapshotChanges();
  }

}
