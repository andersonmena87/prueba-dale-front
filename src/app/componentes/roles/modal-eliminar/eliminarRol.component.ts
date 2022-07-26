import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { RolModel } from '../../../Models/Rol.model';
import { RolService } from '../../../services/rol.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './eliminarRol.component.html',
  styleUrls: ['./eliminarRol.component.scss'],
  providers: [Util]
})

export class EliminarRolComponent {
  constructor(
    private dialogRef: MatDialogRef<EliminarRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RolModel,
    private rolService: RolService,
    private _snackBar: MatSnackBar,
    private util: Util
  ) {

  }

  delete() {
    this.rolService.delete(this.data.idRol).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Rol eliminado con éxito.", "X", "green-snackbar");
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
