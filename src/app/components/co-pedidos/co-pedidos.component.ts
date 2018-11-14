import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-co-pedidos',
  templateUrl: './co-pedidos.component.html',
  styleUrls: ['./co-pedidos.component.css']
})
export class CoPedidosComponent implements OnInit {

  public coPedidos = [];
  public comercio: any = {}; 
  public userId: string;
  public comercioId: string;
  public productos = [];
  public usuario:any = {};
  public conPendientes: number;
  public conAceptados: number;
  public conListos: number;
  public conHistorial: number;

  constructor(public afs: AngularFirestore, private _us: UsuarioService, private _co: ComercioService, private _fs: FirebaseService, private router: Router) { 


  }

  ngOnInit() { 

	this._us.afAuth.authState.subscribe( user => {
		if( user ){
			this.obtenerDocUsuario( user.uid ).subscribe( param => {
				this.usuario = param.payload.data();
				console.log(this.usuario.nombre);
				console.log(this.usuario.idCom);
				this.obtenerPedidosComercio( this.usuario.idCom ).subscribe( snap => {
					// console.log(data);
					this.coPedidos = [];
					this.conPendientes = 0;
					this.conAceptados = 0;
					this.conListos = 0;
					this.conHistorial = 0;
					snap.forEach( (data:any) => {
						// console.log(param);
						this.coPedidos.push({
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

						// console.log('contador:' , param.payload.doc.data().estado);

						if(data.payload.doc.data().estado == 'Pendiente'){
							this.conPendientes ++;
						}
						if(data.payload.doc.data().estado == 'Aceptado'){
							this.conAceptados ++;
						}
						if(data.payload.doc.data().estado == 'En Camino' || data.payload.doc.data().estado == 'Listo para Retirar'){
							this.conListos ++;
						}
						if(data.payload.doc.data().estado == 'Completado' || data.payload.doc.data().estado == 'Rechazado'){
							this.conHistorial ++;
						}

					});
					console.log('Pendientes:', this.conPendientes);
					console.log('Aceptados:', this.conAceptados);
					console.log('Listos:', this.conListos);
					console.log('Historial:', this.conHistorial);
				});
				
			});
		} else{
			return;
		}
	}); 

    // this._us.afAuth.authState.subscribe( user => {
    //   if( user ){
    //     this.userId = user.uid;
    //     this.obtenerComercio( 'I8NViOS79Lap4LsPpJH0' ).subscribe( data => {
    //       this.comercio = [];
    //       this.comercioId = data.payload.id;
    //       this.comercio = data.payload.data();
    //       console.log(this.comercioId);
    //       this.obtenerPedidos( this.comercioId ).subscribe( data => {
    //         console.log(data);
    //         this.coPedidos = [];
    //         data.forEach( param => {
    //           // console.log(param);
    //           this.coPedidos.push({
    //             id: param.payload.doc.id,
    //             entrega: param.payload.doc.data().entrega,
    //             fecha: param.payload.doc.data().fecha,
    //             precioEntrega: param.payload.doc.data().precioEntrega,
    //             total: param.payload.doc.data().total,
    //             idUser: param.payload.doc.data().idUser,
    //             direccion: {
    //               barrio: param.payload.doc.data().direccion.barrio,
    //               calle: param.payload.doc.data().direccion.calle,
    //               ciudad: param.payload.doc.data().direccion.ciudad,
    //               cp: param.payload.doc.data().direccion.cp,
    //               numero: param.payload.doc.data().direccion.numero,
    //               provincia: param.payload.doc.data().direccion.provincia
    //             },
    //             productos: [param.payload.doc.data().productos]
    //           });
    //           param.payload.doc.data().productos.forEach( p => {
    //             console.log("producto", p.nombre);
    //           });

    //         });
    //       });
    //     });

    //   } else{
    //     return;
    //   }

    // });

  }

  // METODOS




  // METODOS NUEVOS

  public irAtras(){
    this._us.goBack();
  }

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  private obtenerPedidosComercio( comercioId: string ){
    return this.afs.collection( 'pedidos', ref => ref.where( 'comercioId', '==', comercioId )).snapshotChanges();
  }

  private verPedido( idx: string ){
    this.router.navigate(['/detalle-co-pedido', idx]);
  }
  


}
