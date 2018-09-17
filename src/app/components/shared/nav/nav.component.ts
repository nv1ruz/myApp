import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../../providers/firebase.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor( public _fs: FirebaseService ) { }

  ngOnInit() {
  }

}
