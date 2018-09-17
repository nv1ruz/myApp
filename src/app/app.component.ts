import { Component } from '@angular/core';

import { FirebaseService } from './providers/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public _opened: boolean = false;
  
  constructor( public _fs: FirebaseService ) { }
 
 
  public _toggleOpened() {
    this._opened = !this._opened;
  }

}
