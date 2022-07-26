import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { UsuarioModel } from '../../../models/Usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './eliminarUsuario.component.html',
  styleUrls: ['./eliminarUsuario.component.scss'],
  providers: [Util]
})

export class EliminarUsuarioComponent {
  constructor(
    private dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModel,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private util: Util
  ) {

  }

  delete() {
    this.usuarioService.deleteUser(this.data.idUsuario).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Usuario eliminado con éxito.", "X", "green-snackbar");
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
  }
}
