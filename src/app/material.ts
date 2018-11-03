import { NgModule } from '@angular/core';


import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
      MatButtonModule, 
      MatCheckboxModule, 
      MatIconModule, 
      MatSlideToggleModule,
      MatDialogModule,
      MatSelectModule
    ],
    exports: [
      MatButtonModule, 
      MatCheckboxModule, 
      MatIconModule, 
      MatSlideToggleModule,
      MatDialogModule,
      MatSelectModule
    ]
  })

export class MaterialModule { }