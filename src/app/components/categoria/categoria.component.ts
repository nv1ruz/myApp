import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public usuario:any = {};

  constructor( private _cs: ComercioService, private _us: UsuarioService, private router: Router ) { }

  ngOnInit() {

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();
        });
      } else{
        return;
      }
    });

  }


    

  // MÉTODOS ***************************************

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  public guardarCategoria( documentId: string, nombre: string ){
    this._cs.pushCategoria( documentId, nombre );
    this.router.navigate(['/micomercio/menu']);
  }

  
}
