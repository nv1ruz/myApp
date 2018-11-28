import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../providers/usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  public usuario: any = {}

  constructor( private _us: UsuarioService, private afs: AngularFirestore ) { 

    this._us.afAuth.authState.subscribe( user =>{

      if( !user ){
        return;
      }

      this.obtenerUsuario( user.uid ).subscribe( datos =>{

        this.usuario = datos.payload.data();

      });

    });

  }

  ngOnInit() {
  }


  public irAtras(){
    this._us.goBack();
  }

  private obtenerUsuario( usuarioId: string ){

    return this._us.getDocUsuario( usuarioId );

  }

  public actualizarPerfil( nick: string, nombre: string, apellido: string, movil: string ){

    this.afs.collection( 'usuarios' ).doc( this.usuario.uid ).update({

      nick: nick,
      nombre: nombre,
      apellido: apellido,
      movil: movil

    }).then( () => {

      console.log( 'Documento actualizado') 

    }).catch( err => {

      console.log( 'Error al actualizar el documento: ', err );

    });    

  }

}
