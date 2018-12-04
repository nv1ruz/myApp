import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { AutenticacionService } from '../../providers/autenticacion.service';
import { ComercioService } from '../../providers/comercio.service';
import { UsuarioService } from '../../providers/usuario.service';
declare var $:any;


@Component({
  selector: 'app-mi-comercio',
  templateUrl: './mi-comercio.component.html',
  styleUrls: ['./mi-comercio.component.css']
})
export class MiComercioComponent implements OnInit {
  color = 'primary';

  public usuario:any = {};
  public comercio: any = {};
  public comercioId: string;
  public abierto: boolean = false;

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
            if( this.comercio.abierto == true ){
              this.abierto = true;
              this.comercio.abierto = true;
            } else{
              this.abierto = false;
              this.comercio.abierto = false;
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

  public estado( comercioId: string ){
    if( this.abierto ){
      this._cs.estadoComercio( comercioId, false );
    } else{
      this._cs.estadoComercio( comercioId, true );
    }
  }
}
