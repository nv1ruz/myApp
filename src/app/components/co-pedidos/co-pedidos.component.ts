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

  constructor(private _us: UsuarioService, private _co: ComercioService, private _fs: FirebaseService) { 


  }

  ngOnInit() { 

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.userId = user.uid;
        this.obtenerComercio( 'I8NViOS79Lap4LsPpJH0' ).subscribe( data => {
          this.comercio = [];
          this.comercioId = data.payload.id;
          this.comercio = data.payload.data();
          console.log(this.comercioId);
          this.obtenerPedidos( this.comercioId ).subscribe( data => {
            console.log(data);
            this.coPedidos = [];
            data.forEach( param => {
              // console.log(param);
              this.coPedidos.push({
                id: param.payload.doc.id,
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
                // data: param.payload.doc.data()
              });
              param.payload.doc.data().productos.forEach( p => {
                console.log("producto", p.nombre);
                // this.productos.push({
                //   id: p.payload.doc.data().id,
                //   cant: p.payload.doc.data().cant,
                //   img: p.payload.doc.data().img,
                //   ing: p.payload.doc.data().ing,
                //   nombre: p.payload.doc.data().nombre,
                //   nota: p.payload.doc.data().nota,
                //   pre: p.payload.doc.data().pre
                // });
              });
              // this.productos = param.payload.doc.data().productos;

            });
            // console.log(this.productos);
          });
        });

      } else{
        return;
      }

    });

  }

  // METODOS

  private obtenerPedidos( refId: string ){
    return this._co.pedidosComercio( refId ).snapshotChanges();
  }

  private obtenerComercio( documentId: string ){
    return this._co.getComercio( documentId );
  }

}
