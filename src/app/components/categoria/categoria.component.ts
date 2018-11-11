import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  fileNameDialogRef: MatDialogRef<DialogComponent>;

  public usuario:any = {};
  public categoria:any = {};
  private parametro: string;
  public editar:boolean = false;
  public titulo: string = 'Añadir nueva categoría';
  public txtBoton: string = 'Guardar';
  public fCategoria: FormGroup;
  
  public productos:any = [];

  constructor( private _cs: ComercioService, private _us: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog ) { 
    
    this.activatedRoute.params.subscribe( param => {
      this.parametro = param.id;
      console.log( this.parametro );
    });

    this.fCategoria = new FormGroup({
      'nombre': new FormControl()
    });

  }

  ngOnInit() {

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();
          if( this.parametro ){
            this.obtenerCategoria( this.usuario.idCom, this.parametro ).subscribe( data => {
              this.categoria = data.payload.data();
              console.log( this.categoria );
              if( this.categoria ){
                this.editar = true;
                this.titulo = 'Editar categoría';
                this.txtBoton = 'Actualizar';
                this.fCategoria.controls['nombre'].setValue( this.categoria.nombre );    

                this._cs.getProductosSegunCategoria( this.usuario.idCom, this.categoria.nombre ).subscribe( param => {
                  // console.log( param );
                  this.productos = [];
                  param.forEach( pro => {
                    this.productos.push({
                      id: pro.payload.doc.id,
                      data: pro.payload.doc.data()
                    });
                  });
                  // console.log( this.productos );
                });    


              } else{
                this.editar = false;
                this.titulo = 'Añadir nueva categoría'
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


    

  // MÉTODOS ***************************************

  public irAtras(){
    this._us.goBack();
  }

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  public guardarCategoria( comercioId: string, categoriaNombre: string ){
    if( this.editar ){
      this.actualizarProductos( comercioId, categoriaNombre );
      this._cs.updCategoria( comercioId, this.parametro , categoriaNombre );
      this.router.navigate(['/micomercio/menu']);
    } else{
      this._cs.pushCategoria( comercioId, categoriaNombre );
      this.router.navigate(['/micomercio/menu']);
    }
  }

  private obtenerCategoria( comercioId: string, categoriaId: string ){
    return this._cs.getCategoria( comercioId, categoriaId );
  }
  
  private actualizarProductos( comercioId: string, categoriaNombre: string ){
    this.productos.forEach( prod => {
      this._cs.afs.collection( 'comercios' ).doc( comercioId )
                    .collection( 'productos' ).doc( prod.id ).update({
                      categoria: categoriaNombre
                    })
                    .then( function() {
                      console.log( "Documento actualizado con exito" );
                    })
                    .catch( function(error) {
                      console.log( "Error al actualizar el documento" );
                    });
    });
  }

  public borrarCategoria(){
    
      if( this.productos.length >= 1 ){
        console.log( "existen productos en la categoría" );
      } else{
        // console.log( "no existen productos en la categoría" );
        this._cs.deleteCategoria( this.usuario.idCom, this.parametro );
        console.log( "categoría eliminada" );
        this.router.navigate(['/micomercio/menu']);
      }  

  }



  openAddFileDialog() {
    this.fileNameDialogRef = this.dialog.open( DialogComponent, {
      data: {
        nombre: this.fCategoria.controls['nombre'].value,
        editar: this.editar
      }
    } );

    this.fileNameDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if( result ){
        this.guardarCategoria( this.usuario.idCom, this.fCategoria.controls['nombre'].value );
      } else{
        return;
      }
    });

  }









}
