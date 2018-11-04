import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

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

  constructor(private _us: UsuarioService, private _co: ComercioService, private _fs: FirebaseService) { 


  }

  ngOnInit() { 

	this._us.afAuth.authState.subscribe( user => {
		if( user ){
			this.obtenerDocUsuario( user.uid ).subscribe( param => {
				this.usuario = param.payload.data();
				console.log(this.usuario.nombre);
				console.log(this.usuario.idCom);
				this.obtenerPedidos( this.usuario.idCom ).subscribe( data => {
					// console.log(data);
					this.coPedidos = [];
					this.conPendientes = 0;
					this.conAceptados = 0;
					this.conListos = 0;
					this.conHistorial = 0;
					data.forEach( param => {
						// console.log(param);
						this.coPedidos.push({
							id: param.payload.doc.id,
							estado: param.payload.doc.data().estado,
							entrega: param.payload.doc.data().entrega,
							fecha: param.payload.doc.data().fecha,
							precioEntrega: param.payload.doc.data().precioEntrega,
							total: param.payload.doc.data().total,
							idUser: param.payload.doc.data().idUser,
							direccion: {
								barrio: param.payload.doc.data().direccion.barrio,
								calle: param.payload.doc.data().direccion.calle,
								ciudad: param.payload.doc.data().direccion.ciudad,
								cp: param.payload.doc.data().direccion.cp,
								numero: param.payload.doc.data().direccion.numero,
								provincia: param.payload.doc.data().direccion.provincia
							},
							productos: [param.payload.doc.data().productos]
						});

						// console.log('contador:' , param.payload.doc.data().estado);

						if(param.payload.doc.data().estado == 0){
							this.conPendientes ++;
						}
						if(param.payload.doc.data().estado == 1){
							this.conAceptados ++;
						}
						if(param.payload.doc.data().estado == 2 || param.payload.doc.data().estado == 3){
							this.conListos ++;
						}
						if(param.payload.doc.data().estado == 4 || param.payload.doc.data().estado == 5){
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

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  private obtenerComercio( documentId: string ){
    return this._co.getComercio( documentId );
  }

  private obtenerPedidos( refId: string ){
    return this._co.pedidosComercio( refId ).snapshotChanges();
  }


}
