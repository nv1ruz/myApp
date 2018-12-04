import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FirebaseService } from '../../providers/firebase.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public conEncurso: number;
  public conHistorial: number;

  public usuario:any = {};
  public pedidos:any = [];

  ver:string = '';

  constructor( public ap: AppComponent, public afs: AngularFirestore, private _us: UsuarioService, private _co: ComercioService, private _fs: FirebaseService) { 

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();
          console.log(this.usuario.nombre);
          console.log(this.usuario.idCom);
          this.obtenerPedidosUsuario( this.usuario.uid ).subscribe( snap => {
            // console.log(data);
            this.pedidos = [];
            this.conEncurso = 0;
            this.conHistorial = 0;
            snap.forEach( (data:any) => {
              // console.log(param);

              this.obtenerComercio( data.payload.doc.data().comercioId ).subscribe( (com:any) => {
                // console.log( com.payload.data() );
                
                this.pedidos.push({
                  id: data.payload.doc.id,
                  comercioId: data.payload.doc.data().comercioId,
                  comercioNombre: com.payload.data().nombre,
                  comercioFoto: com.payload.data().img,
                  comercioCalle: com.payload.data().direccion.calle,
                  comercioBarrio: com.payload.data().direccion.barrio,
                  comercioNumero: com.payload.data().direccion.numero,
                  usuarioId: data.payload.doc.data().usuarioId,
                  fecha: data.payload.doc.data().fecha,
                  // entrega: data.payload.doc.data().entrega,
                  delivery: data.payload.doc.data().delivery,
                  direccion: data.payload.doc.data().direccion,
                  deliveryPrecio: data.payload.doc.data().precioDelivery,
                  total: data.payload.doc.data().total,
                  estado: data.payload.doc.data().estado
                });

                // console.log('contador:' , param.payload.doc.data().estado);
  
                if(data.payload.doc.data().estado == 'Pendiente' || data.payload.doc.data().estado == 'En proceso' || data.payload.doc.data().estado == 'Listo'){
                  this.conEncurso ++;
                }
                if(data.payload.doc.data().estado == 'Aceptado'){
                  this.conHistorial ++;
                }

              });  
  
            });
            console.log( this.pedidos );
            
            // console.log('En Curso:', this.conEncurso);
            // console.log('Historial:', this.conHistorial);
          });
          
        });
      } else{
        return;
      }
    }); 

  }

  ngOnInit() {

  }

  // METODOS

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  private obtenerPedidosUsuario( usuarioId: string ){
    return this.afs.collection( 'pedidos', ref => ref.where( 'usuarioId', '==', usuarioId ) ).snapshotChanges();
  }

  private obtenerComercio( comercioId: string ){
    return this._co.getComercio( comercioId );
  }

  public verPedido( pedidoId: string ){
    if( this.ver == pedidoId ){
      this.ver = '';
    } else{
      this.ver = pedidoId;
    }
  }

}
