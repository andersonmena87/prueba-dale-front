import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { RolModel } from '../../../models/Rol.model';
import { RolService } from 'src/app/services/rol.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss'],
  providers: [Util]
})

export class RolComponent implements OnInit {
  formControl!: FormControl;
  metodo!: string;
  constructor(
    private dialogRef: MatDialogRef<RolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RolModel,
    private rolService: RolService,
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
    this.rolService.save(this.data).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Rol creado con éxito.", "X", "green-snackbar");
          this.dialogRef.close();
        }
      },
        error : (error) => {
          throw new Error(error);
        }
    })
  }

  update() {
    this.rolService.update(this.data).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Rol actualizado con éxito.", "X", "green-snackbar");
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
