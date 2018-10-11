import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';


@Component({
  selector: 'app-domicilios',
  templateUrl: './domicilios.component.html',
  styleUrls: ['./domicilios.component.css']
})
export class DomiciliosComponent implements OnInit {
 
  public visible: boolean = false;
  public domicilios = [];

  constructor( private _fs: FirebaseService ) { }

  ngOnInit() {
    this.getDomicilios().subscribe( (snap) => {
      this.domicilios = [];
      snap.forEach( (data: any) => {
        console.log( data.payload.doc.data() );
        this.domicilios.push({
          id: data.payload.doc.id,
          // data: data.payload.doc.data(),
          calle: data.payload.doc.data().calle,
          numero: data.payload.doc.data().numero,
          cp: data.payload.doc.data().cp,
          provincia: data.payload.doc.data().provincia,
          ciudad: data.payload.doc.data().ciudad
        });
      });
      console.log(this.domicilios);
    });
  }

  guardarDomicilio( cal: string, num: string, pis: string, ent: string, ref: string, cp: string, pro: string, ciu: string ){
    this._fs.afs.collection( 'usuarios' ).doc( this._fs.usuario.uid )
    .collection( 'direcciones' ).add({
      calle: cal,
      numero:  num,
      pisoDepto: pis,
      entreCalles: ent,
      referencias: ref,
      cp: cp,
      provincia: pro,
      ciudad: ciu
    }).then( function() {
      console.log( "El documento se guardó correctamente");
    }).catch( function(error) {
      console.log( "Hubo un error al guardar el documento: ", error);
    });
  }

  getDomicilios(){
    return this._fs.afs.collection( 'usuarios' ).doc( 'VUPmhwq57BVGwVLh1YRtpvE21Bt1' )
    .collection('direcciones').snapshotChanges();
  }

  toggle(){
    this.visible = !this.visible;
  }

}
