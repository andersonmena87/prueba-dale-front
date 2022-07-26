import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UsuarioModel } from '../../../Models/Usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [Util]
})

export class UsuarioComponent implements OnInit {
  formControl!: FormControl;
  metodo!: string;
  constructor(
    private dialogRef: MatDialogRef<UsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModel,
    private usuarioService: UsuarioService,
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
    this.usuarioService.saveUser(this.data).subscribe({
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
    this.usuarioService.updateUser(this.data).subscribe({
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
