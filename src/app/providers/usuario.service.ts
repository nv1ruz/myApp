import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( public location: Location, private afs: AngularFirestore, public afAuth: AngularFireAuth ) { }



  // MÉTODOS ***************************************

  public goBack(){
    this.location.back();
  }

  public getDocUsuario( documentId: string ){
    return this.afs.collection( 'usuarios' ).doc( documentId ).snapshotChanges();
  }

  public getDomicilios( refId: string ){
    return this.afs.collection( 'usuarios' ).doc( refId )
                    .collection('direcciones').snapshotChanges();
  }

  public getDireccion( userId: string, dirId: string ){
    return this.afs.collection( 'usuarios' ).doc( userId )
                    .collection( 'direcciones' ).doc( dirId ).snapshotChanges();
  }

  public pushDireccion( refId: string, cal: string, num: number, pis: string, ent: string, bar: string, ref: string, lat: number, lng: number){
    return this.afs.collection( 'usuarios' ).doc( refId )
                    .collection( 'direcciones' ).add({
                      calle: cal,
                      numero:  num,
                      pisoDepto: pis,
                      entreCalles: ent,
                      barrio: bar,
                      referencias: ref,
                      cp: '5380',
                      provincia: 'La Rioja',
                      ciudad: 'Chamical',
                      // cp: cp,
                      // provincia: pro,
                      // ciudad: ciu
                      lat: lat,
                      lng: lng
                    }).then( function() {
                      console.log( "El documento se guardó correctamente");
                    }).catch( function(error) {
                      console.log( "Hubo un error al guardar el documento: ", error);
                    });
  }

  public updDireccion( refId: string, dirId: string, cal: string, num: number, pis: string, ent: string, bar: string, ref: string, lat: number, lng: number ){
    return this.afs.collection( 'usuarios' ).doc( refId )
                    .collection( 'direcciones' ).doc( dirId ).update({
                      calle: cal,
                      numero:  num,
                      pisoDepto: pis,
                      entreCalles: ent,
                      barrio: bar,
                      referencias: ref,
                      cp: '5380',
                      provincia: 'La Rioja',
                      ciudad: 'Chamical',
                      lat: lat,
                      lng: lng
                    })
                    .then( function() {
                      console.log( "Documento actualizado con exito" );
                    })
                    .catch( function(error) {
                      console.log( "Error al actualizar el documento" );
                    });
  }

  public deleteDomicilio( documentId: string, domicilioId: string ){
    return this.afs.collection( 'usuarios' ).doc( documentId )
                    .collection( 'direcciones' ).doc( domicilioId ).delete()
  }

  public pedidosUsuario( usuarioId: string ){
    return this.afs.collection( 'usuarios' ).doc( usuarioId )
                    .collection( 'pedidos' );
  }

}
