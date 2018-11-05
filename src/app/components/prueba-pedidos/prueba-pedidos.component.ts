import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';
// import { spawn } from 'child_process';

@Component({
  selector: 'app-prueba-pedidos',
  templateUrl: './prueba-pedidos.component.html',
  styleUrls: ['./prueba-pedidos.component.css']
})
export class PruebaPedidosComponent implements OnInit {

  public pedidos:any = [];
  public pedidosUsuario:any = [];

  constructor( public afs: AngularFirestore, private _co: ComercioService, private _us: UsuarioService ) { 

    this.obtenerPedidosComercio( 'I8NViOS79Lap4LsPpJH0' ).subscribe( snap => {
      // console.log( snap );
      this.pedidos = [];
      snap.forEach( (data:any) => {
        // console.log( data );
        this.pedidos.push({
          id: data.payload.doc.id,
          comercioId: data.payload.doc.data().comercioId,
          usuarioId: data.payload.doc.data().usuarioId,
          fecha: data.payload.doc.data().fecha,
          entrega: data.payload.doc.data().entrega,
          direccion: data.payload.doc.data().direccion,
          deliveryPrecio: data.payload.doc.data().precioDelivery,
          total: data.payload.doc.data().total,
          estado: data.payload.doc.data().estado
        });
      });
      console.log( this.pedidos );
    });

    this.obtenerPedidosUsuario( 'VUPmhwq57BVGwVLh1YRtpvE21Bt1' ).subscribe( snap => {
      this.pedidosUsuario = [];
      snap.forEach( (data:any) => {
        this.pedidosUsuario.push({
          id: data.payload.doc.id,
          comercioId: data.payload.doc.data().comercioId,
          usuarioId: data.payload.doc.data().usuarioId,
          fecha: data.payload.doc.data().fecha,
          entrega: data.payload.doc.data().entrega,
          direccion: data.payload.doc.data().direccion,
          deliveryPrecio: data.payload.doc.data().precioDelivery,
          total: data.payload.doc.data().total,
          estado: data.payload.doc.data().estado
        });
      });
      console.log( this.pedidosUsuario );
    });

  }

  ngOnInit() {
  }

  private obtenerPedidosComercio( comercioId: string ){
    return this.afs.collection( 'pedidos', ref => ref.where( 'comercioId', '==', comercioId ) ).snapshotChanges();
  }

  public cambiarEstadoaConfirmado( estadoId:string ){
    this.afs.collection( 'pedidos' ).doc( estadoId ).update({
      estado: 'Confirmado'
    });
  }

  private obtenerPedidosUsuario( usuarioId: string ){
    return this.afs.collection( 'pedidos', ref => ref.where( 'usuarioId', '==', usuarioId ) ).snapshotChanges();
  }

  public detallePedidoUsuario( pedidoId: string ){
    var ref;
    var pedido = {};
    ref = this.afs.collection( 'pedidos' ).doc( pedidoId ).snapshotChanges();
    ref.subscribe( snap => {
      pedido = snap.payload.data()
      console.log(pedido);
    });
  }

} 
