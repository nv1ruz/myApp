import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  opcion: boolean = true;
  mensaje: string = '';
  textBoton: string = '';

  constructor( public dialogRef: MatDialogRef<DialogComponent>,  @Inject(MAT_DIALOG_DATA) public data ) { 

    if( data.editar ){
      this.mensaje = '¿Desea actualizar esta categoría?';
      this.textBoton = 'Actualizar';
    } else{
      this.mensaje = '¿Desea agregar esta categoría?';
      this.textBoton = 'Agregar';
    }

  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
