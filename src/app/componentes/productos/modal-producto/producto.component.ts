import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ProductoModel } from '../../../Models/Producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [Util]
})

export class ProductoComponent implements OnInit {
  formControl!: FormControl;
  metodo!: string;
  constructor(
    private dialogRef: MatDialogRef<ProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoModel,
    private productoService: ProductoService,
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
    this.productoService.save(this.data).subscribe({
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
    this.productoService.update(this.data).subscribe({
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
