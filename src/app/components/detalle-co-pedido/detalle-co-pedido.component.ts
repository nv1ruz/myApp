import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { FirebaseService } from '../../providers/firebase.service';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-co-pedido',
  templateUrl: './detalle-co-pedido.component.html',
  styleUrls: ['./detalle-co-pedido.component.css']
})
export class DetalleCoPedidoComponent implements OnInit {

  public pedido: any = {};
  public refId:string;
  public visible: boolean = false;


  constructor(public ap: AppComponent, public _fs: FirebaseService, private _co: ComercioService, private _us: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute ) {

    // captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {
      this.refId = param.id;
    })

   }

  ngOnInit() {

    this.obtenerPedido( this.refId ).subscribe( param => {

      this.pedido = [];
      this.pedido = param.payload.data();

    });

  }


  public toggleMapa() {
    this.visible = !this.visible;
  }


  // METODOS

  public irAtras(){
    this._us.goBack();
  }

  private obtenerPedido( documentId: string ){
    return this._co.getComercio( documentId );
  }

}
