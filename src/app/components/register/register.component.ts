import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   // Validacion de Campos
   rForm: FormGroup;
   email:string = '';
   clave1:string = '';
   clave2:string = '';

  constructor( private _fs: FirebaseService, private _fb: FormBuilder ) {

     // Validacion de Campos
     this.rForm = _fb.group({
      'email': [null, Validators.required],
      'clave1': [null, Validators.required],
      'clave2': [null, Validators.required]
    })

   }

  ngOnInit() {
  }

  registro( email: string, pass: string ){
    this._fs.registroEmail( email, pass );
  }

}
