import { NgModule } from '@angular/core';


import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
    imports: [
      MatButtonModule, 
      MatCheckboxModule, 
      MatIconModule, 
      MatSlideToggleModule
    ],
    exports: [
      MatButtonModule, 
      MatCheckboxModule, 
      MatIconModule, 
      MatSlideToggleModule
    ]
  })

export class MaterialModule { }