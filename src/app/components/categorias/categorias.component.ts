import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../../providers/usuario.service';
import { ComercioService } from '../../providers/comercio.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public usuario:any = {};
  public categorias = [];
  public anterior: string;
  public txtBtn: string = "Nueva categoría";
  public nuevo:boolean = false;
  public myGroup: FormGroup;

  constructor( public ap: AppComponent, private _cs: ComercioService, private _us: UsuarioService ) { 
    
    // string con la urlAnterior
    this.anterior = this.ap.prevUrl;

    this.myGroup = new FormGroup({
      fCategoria: new FormControl('', [ Validators.compose([Validators.required, Validators.maxLength(20)]) ])
   });

  }

  ngOnInit() {

    this._us.afAuth.authState.subscribe( user => {
      if( user ){
        this.obtenerDocUsuario( user.uid ).subscribe( param => {
          this.usuario = param.payload.data();
          this.obtenerCategorias( this.usuario.idCom ).subscribe( snap => {
            this.categorias = [];
            snap.forEach( data => {
              this.categorias.push({
                id: data.payload.doc.id,
                nombre: data.payload.doc.data().nombre
              });      
            });            
            // console.log(this.categorias);
          });          
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

  private obtenerCategorias( documentId: string ){
    return this._cs.getCategorias( documentId );
  }

  private obtenerDocUsuario( id: string ){
    return this._us.getDocUsuario( id );
  }

  public toggle(){
    this.myGroup.reset({'fCategoria': ''}); 
    if( this.nuevo ){
      this.txtBtn = "Agregar categoría";
      this.nuevo = !this.nuevo;      
    } else{
      this.txtBtn = "Cancelar";
      this.nuevo = !this.nuevo;    
    }
  }

  public guardarCategoria( documentId: string, nombre: string ){
    this._cs.pushCategoria( documentId, nombre );
    this.toggle();
  }

  public borrarCategoria( documentId: string , categoriaId: string ){
    return this._cs.deleteCategoria( documentId, categoriaId );
  }

  private obtenerProductos( documentId: string, nameCat: string ){
    return this._cs.afs.collection( 'comercios' ).doc( documentId )
                    .collection( 'productos', ref => ref.where( 'categoria', '==', nameCat ) ).valueChanges();
  }


}
