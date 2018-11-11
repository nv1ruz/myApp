import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../providers/usuario.service';


@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  constructor( private _us: UsuarioService ) { }

  ngOnInit() {
  }


  // METODOS

  public irAtras(){
    this._us.goBack();
  }

}
