import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../providers/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public _fs: FirebaseService, private afs: AngularFirestore ) {   }

  private loginWithEmailAndPass( email: string, pass: string ){
    this._fs.loginEmailPass( email, pass );
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
