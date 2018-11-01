import { NgModule } from '@angular/core';


import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
      MatButtonModule, 
      MatCheckboxModule, 
      MatIconModule, 
      MatSlideToggleModule,
      MatDialogModule
    ],
    exports: [
      MatButtonModule, 
      MatCheckboxModule, 
      MatIconModule, 
      MatSlideToggleModule,
      MatDialogModule
    ]
  })

export class MaterialModule { }