import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-co-pedido',
  templateUrl: './detalle-co-pedido.component.html',
  styleUrls: ['./detalle-co-pedido.component.css']
})
export class DetalleCoPedidoComponent implements OnInit {
  public visible: boolean = false;


  constructor() { }

  ngOnInit() {

  }


  public toggleMapa() {
    this.visible = !this.visible;
  }

}
