import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { AutenticacionService } from '../../providers/autenticacion.service';
import { ComercioService } from '../../providers/comercio.service';
import { UsuarioService } from '../../providers/usuario.service';



@Component({
  selector: 'app-mi-comercio',
  templateUrl: './mi-comercio.component.html',
  styleUrls: ['./mi-comercio.component.css']
})
export class MiComercioComponent implements OnInit {

  public usuario:any = {};
  public comercio: any = {};

  constructor( public ap: AppComponent, private _co: ComercioService, private _as: AutenticacionService, private _us: UsuarioService ) { }

  ngOnInit() {


    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();

          this.obtenerComercio( this.usuario.idCom ).subscribe( data => {
            this.comercio = [];
            this.comercio = data.payload.data();
          });

        });
      } else{
        return;
      }
    });  



      
      



  }



  // MÉTODOS ************************************

  private obtenerComercio( documentId: string ){
    return this._co.getComercio( documentId );
  }

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

}
