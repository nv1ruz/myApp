import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { FirebaseService } from '../../providers/firebase.service';
import { AutenticacionService } from '../../providers/autenticacion.service';
import { ComercioService } from '../../providers/comercio.service';
import { UsuarioService } from '../../providers/usuario.service';

@Component({
  selector: 'app-co-config',
  templateUrl: './co-config.component.html',
  styleUrls: ['./co-config.component.css']
})
export class CoConfigComponent implements OnInit {

  // private refUID: string;
  public usuario:any = {};
  public comercio: any = {};
  public comercioId: string;
  public estadoDelivery: boolean = false;

  constructor( public ap: AppComponent, private _cs: ComercioService, private _as: AutenticacionService, private _us: UsuarioService, public _fs: FirebaseService ) { }

  ngOnInit() { 

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();
          this.comercioId = this.usuario.idCom;
          this.obtenerComercio( this.usuario.idCom ).subscribe( data => {
            this.comercio = [];
            this.comercio = data.payload.data();
            if( this.comercio.delivery == true ){
              this.estadoDelivery = true;
              this.comercio.delivery = true;
            } else{
              this.estadoDelivery = false;
              this.comercio.delivery = false;
            }
          });

        });
      } else{
        return;
      }
    });  


  }


  // MÉTODOS ************************************

  public irAtras(){
    this._us.goBack();
  }

  private obtenerComercio( documentId: string ){
    return this._cs.getComercio( documentId );
  }

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  actualizarDatos(nom: string, des: string, pDel: number, hor: string, barr: string, call: string, nume: string){
    let refDoc = this._fs.afs.collection( 'comercios' ).doc( this.comercioId );
    refDoc.update({
      nombre: nom,
      descripcion: des,
      deliveryPrecio: pDel,
      horarios: hor,
      barrio: barr,
      calle: call,
      numero: nume
    })
    .then( function() {
      console.log( "Documento actualizado correctamente");
    })
    .catch( function(error) {
      console.log( "Error al actualizar documento: ", error);
    });
  }

  public estado( comercioId: string ){
    if( this.estadoDelivery ){
      this._cs.esDelivery( comercioId, false );
    } else{
      this._cs.esDelivery( comercioId, true );
    }
  }



}
