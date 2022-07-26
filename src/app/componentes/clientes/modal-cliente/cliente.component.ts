import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ClienteModel } from '../../../models/Cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [Util]
})

export class ClienteComponent implements OnInit {
  formControl!: FormControl;
  metodo!: string;
  constructor(
    private dialogRef: MatDialogRef<ClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClienteModel,
    private clienteService: ClienteService,
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
    this.clienteService.save(this.data).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Cliente creado con éxito.", "X", "green-snackbar");
          this.dialogRef.close();
        }
      },
        error : (error) => {
          throw new Error(error);
        }
    })
  }

  update() {
    this.clienteService.update(this.data).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Cliente actualizado con éxito.", "X", "green-snackbar");
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
