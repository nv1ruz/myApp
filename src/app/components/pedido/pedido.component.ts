import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../providers/usuario.service';
import { PedidosService } from '../../providers/pedidos.service';
import { ComercioService } from '../../providers/comercio.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  private pedidoId: string; 
  public pedido: any;
  public productos: any;
  public comercio: any;

  constructor( private activatedRoute: ActivatedRoute, private _us: UsuarioService, private _ps: PedidosService, private _co: ComercioService ) { 

    this._us.afAuth.authState.subscribe( user => {

      if( !user ){
        console.log( 'El usuario no existe' );
      }

    });

    // Captura y almacena el ID enviado por parametro
    this.activatedRoute.params.subscribe( param => {

      this.pedidoId = param.id;

    });

  }

  ngOnInit() {

    this.obtenerPedido( this.pedidoId ).subscribe( datos => {

      this.pedido = datos;
      console.log( this.pedido );

      this.obtenerComercio( this.pedido.comercioId ).subscribe( (data: any) => {

        var estado: string;
        if( data.abierto ){
          estado = 'Abierto';
        } else{
          estado = 'Cerrado';
        }

        this.comercio = {

          nombre: data.nombre,
          calle: data.direccion.calle,
          numero: data.direccion.numero,
          barrio: data.direccion.barrio,
          telefono: data.telefono,
          abierto: data.abierto

        };
        console.log( this.comercio );
      });

    });

    this.obtenerProductos( this.pedidoId ).subscribe( datos => {

      this.productos = datos;
      console.log( this.productos );

    });



  }


  // MÉTODOS ***
  public irAtras(){
    this._us.goBack();
  }

  private obtenerPedido( pedidoId: string ){

    return this._ps.getPedido( pedidoId ).valueChanges();

  }

  private obtenerProductos( pedidoId: string ){

    return this._ps.getPedidoProductos( pedidoId ).valueChanges();

  }

  private obtenerComercio( comercioId: string ){
    return this._co.getCom( comercioId ).valueChanges();
  }

}
