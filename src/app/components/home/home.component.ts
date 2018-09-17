import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public cat : any;
  public comercios = [];
  public comerciosAbiertos = [];
  public comerciosCerrados = [];


    

  constructor( public _fs: FirebaseService, private router: Router, private afs: AngularFirestore ) { }


  ngOnInit() {

    // obtiene los datos de los comercios y los almacena en un arreglo
    this._fs.getComercios().subscribe( (comerciosSnapshot) => {
      this.comercios = [];
      comerciosSnapshot.forEach( (comerciosData: any) => {
        this.comercios.push({
          id: comerciosData.payload.doc.id,
          data: comerciosData.payload.doc.data()
        });
      })
      // console.log(this.comercios);
    });

    // obtiene y almacena solo los comercios "abiertos"
    this._fs.getComercios().subscribe( (comerciosSnapshot) => {
      this.comerciosAbiertos = [];
      comerciosSnapshot.forEach( (comerciosData: any) =>{
        if( comerciosData.payload.doc.data().estado == true ){
          console.log(`${comerciosData.payload.doc.data().nombre} abierto`);
          this.comerciosAbiertos.push({
            id: comerciosData.payload.doc.id,
            data: comerciosData.payload.doc.data()
          });
        } else{
          console.log(`${comerciosData.payload.doc.data().nombre} cerrado`);
        }
      })
      console.log(this.comerciosAbiertos);
    });

    // obtiene y almacena solo los comercios "cerrados"
    this._fs.getComercios().subscribe( (comerciosSnapshot) => {
      this.comerciosCerrados = [];
      comerciosSnapshot.forEach( (comerciosData: any) =>{
        if( comerciosData.payload.doc.data().estado == false ){
          console.log(`${comerciosData.payload.doc.data().nombre} cerrado`);
          this.comerciosCerrados.push({
            id: comerciosData.payload.doc.id,
            data: comerciosData.payload.doc.data()
          });
        } else{
          console.log(`${comerciosData.payload.doc.data().nombre} abierto`);
        }
      })
      console.log(this.comerciosCerrados);
    });

  }

  verComercio( idx: string ){
    this.router.navigate(['/comercio', idx]);
  }

}
