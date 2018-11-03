import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { AutenticacionService } from '../../providers/autenticacion.service';
import { ComercioService } from '../../providers/comercio.service';
import { UsuarioService } from '../../providers/usuario.service';

@Component({
  selector: 'app-co-config',
  templateUrl: './co-config.component.html',
  styleUrls: ['./co-config.component.css']
})
export class CoConfigComponent implements OnInit {

  public usuario:any = {};
  public comercio: any = {};
  public comercioId: string;
  public estadoDelivery: boolean = false;

  constructor( public ap: AppComponent, private _cs: ComercioService, private _as: AutenticacionService, private _us: UsuarioService ) { }

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

  private obtenerComercio( documentId: string ){
    return this._cs.getComercio( documentId );
  }

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }



}
