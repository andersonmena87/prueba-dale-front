import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { VentaModel } from '../../../models/Venta.model';
import { VentaService } from '../../../services/venta.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './eliminarVenta.component.html',
  styleUrls: ['./eliminarVenta.component.scss'],
  providers: [Util]
})

export class EliminarVentaComponent {
  constructor(
    private dialogRef: MatDialogRef<EliminarVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VentaModel,
    private ventaService: VentaService,
    private _snackBar: MatSnackBar,
    private util: Util
  ) {

  }

  delete() {
    this.ventaService.delete(this.data.idVenta).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Compra eliminada con éxito.", "X", "green-snackbar");
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
