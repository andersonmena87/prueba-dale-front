import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { ClienteModel } from '../../../Models/Cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './eliminarCliente.component.html',
  styleUrls: ['./eliminarCliente.component.scss'],
  providers: [Util]
})

export class EliminarClienteComponent {
  constructor(
    private dialogRef: MatDialogRef<EliminarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClienteModel,
    private clienteService: ClienteService,
    private _snackBar: MatSnackBar,
    private util: Util
  ) {

  }

  delete() {
    this.clienteService.delete(this.data.idCliente).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Cliente eliminado con éxito.", "X", "green-snackbar");
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
