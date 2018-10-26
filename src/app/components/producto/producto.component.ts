import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public usuario:any = {};

  constructor( private _cs: ComercioService, private _us: UsuarioService, private router: Router ) {

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

  ngOnInit() {
  }

  // MÉTODOS ***************************************

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  public guardarProducto( comercioId: string, nombre: string, ingredientes: string, categoria: string, precio: number ){
    this._cs.pushProducto( comercioId, nombre, ingredientes, categoria, precio );
    this.router.navigate(['/micomercio/menu']);
  }

}
