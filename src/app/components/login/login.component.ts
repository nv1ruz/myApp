import { Component, OnInit } from '@angular/core';

import { AutenticacionService } from '../../providers/autenticacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _as: AutenticacionService, private router: Router ) {  

    this._as.afAuth.authState.subscribe( user => {
      if( user ){
        this.router.navigate(['/home']);
      } else{
        return;
      }
    });

   }



  ngOnInit(): void { }

  

  // MÉTODOS ***************************************
  
  public iniciarSesion( proveedor: string, email:string, pass:string ){
    return this._as.logIn( proveedor, email, pass );
  }
  
}
