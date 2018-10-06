import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private _fs: FirebaseService ) { }

  ngOnInit() {
  }

  registro( email: string, pass: string ){
    this._fs.registroEmail( email, pass );
  }

}
