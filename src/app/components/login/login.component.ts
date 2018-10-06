import { Component } from '@angular/core';

import { FirebaseService } from '../../providers/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( public _fs: FirebaseService ) {  }

  private loginWithEmailAndPass( email: string, pass: string ){
    this._fs.loginEmailPass( email, pass );
  }

}
