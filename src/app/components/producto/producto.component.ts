import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public usuario:any = {};
  public producto:any = {};
  private prodId: string;
  public editar:boolean = false;
  public titulo: string = 'Añadir nuevo producto';
  public txtBoton: string = 'Guardar';
  fProducto: FormGroup;

  constructor( private _cs: ComercioService, private _us: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute ) {

    this.fProducto = new FormGroup({
      'nombre': new FormControl(),
      'ingredientes': new FormControl(),
      'categoria': new FormControl(),
      'precio': new FormControl()
    });

    this.activatedRoute.params.subscribe( param => {
      this.prodId = param.id;
      // console.log(this.prodId);
      if( this.prodId ){
        // console.log("existe un parametro");
        // this.editar = true;
        // this.titulo = 'Editar producto';
        // this.txtBoton = 'Actualizar';
      } else{
        // console.log("no existe un parametro");
        // this.editar = false;
        // this.titulo = 'Añadir nuevo producto'
        // this.txtBoton = 'Guardar';
      }
    });

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();

          if( this.prodId ){
            this.obtenerProducto( this.usuario.idCom, this.prodId ).subscribe( param => {
              this.producto = param.payload.data();
              // console.log( this.producto );
              if( this.producto ){
                this.editar = true;
                this.titulo = 'Editar producto';
                this.txtBoton = 'Actualizar';
                this.fProducto.controls['nombre'].setValue( this.producto.nombre );
                this.fProducto.controls['ingredientes'].setValue( this.producto.ingredientes );
                this.fProducto.controls['categoria'].setValue( this.producto.categoria );
                this.fProducto.controls['precio'].setValue( this.producto.precio );
              } else{
                this.editar = false;
                this.fProducto.controls['categoria'].setValue( this.prodId );
                this.titulo = 'Añadir nuevo producto'
                this.txtBoton = 'Guardar';
                return;
              }
            });
          } else{
            return;
          }
        });
      } else{
        return;
      }
    });

  }

  ngOnInit() { }

  // MÉTODOS ***************************************

  public irAtras(){
    this._us.goBack();
  }

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  public guardarProducto( comercioId: string, nombre: string, ingredientes: string, categoria: string, precio: number ){
    if( this.editar ){
      this._cs.updProducto( comercioId, this.prodId, nombre, ingredientes, categoria, precio );
      this.router.navigate(['/micomercio/menu']);
    } else{
      this._cs.pushProducto( comercioId, nombre, ingredientes, categoria, precio );
      this.router.navigate(['/micomercio/menu']);
    }
  }

  private obtenerProducto( comId: string, prodId: string ){
    return this._cs.getProducto( comId, prodId );
  }

  public eliminarProducto(){
    this._cs.deleteProducto( this.usuario.idCom, this.prodId );
    this.router.navigate(['/micomercio/menu']);
  }

}
