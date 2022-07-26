import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { VentaModel } from '../../../models/Venta.model';
import { VentaService } from 'src/app/services/venta.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss'],
  providers: [Util]
})

export class VentaComponent implements OnInit {
  formControl!: FormControl;
  metodo!: string;
  constructor(
    private dialogRef: MatDialogRef<VentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VentaModel,
    private ventaService: VentaService,
    private _snackBar: MatSnackBar,
    private util: Util
  ) {

  }

  ngOnInit(): void {
    this.formControl = new FormControl('', [
      Validators.required
    ]);
  }

  processData(){
    if(this.metodo === "save"){
      this.save();
    }else if(this.metodo === "update"){
      this.update();
    }
  }

  save() {
    this.ventaService.save(this.data).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Usuario creado con éxito.", "X", "green-snackbar");
          this.dialogRef.close();
        }
      },
        error : (error) => {
          throw new Error(error);
        }
    })
  }

  update() {
    this.ventaService.update(this.data).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Usuario actualizado con éxito.", "X", "green-snackbar");
          this.dialogRef.close();
        }
      },
        error : (error) => {
          throw new Error(error);
        }
    })
  }

  cancel() {
    this.dialogRef.close();
    this.formControl.reset();
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo obligatorio' : '';
  }
}
