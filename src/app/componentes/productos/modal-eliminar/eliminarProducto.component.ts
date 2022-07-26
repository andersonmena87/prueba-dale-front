import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { ProductoModel } from '../../../models/Producto.model';
import { ProductoService } from '../../../services/producto.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './eliminarProducto.component.html',
  styleUrls: ['./eliminarProducto.component.scss'],
  providers: [Util]
})

export class EliminarProductoComponent {
  constructor(
    private dialogRef: MatDialogRef<EliminarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoModel,
    private productoService: ProductoService,
    private _snackBar: MatSnackBar,
    private util: Util
  ) {

  }

  delete() {
    this.productoService.delete(this.data.idProducto).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Producto eliminado con éxito.", "X", "green-snackbar");
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
