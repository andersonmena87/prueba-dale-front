import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { VentaModel } from '../../../models/Venta.model';
import { ProductoModel } from '../../../models/Producto.model';
import { ClienteModel } from '../../../models/Cliente.model';
import { DetalleVentaModel } from '../../../models/DetalleVenta.model';
import { VentaService } from 'src/app/services/venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Util } from '../../../util/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss'],
  providers: [Util]
})

export class VentaComponent implements OnInit {
  formGroup: FormGroup;
  detalleVenta: DetalleVentaModel = {
    idDetalleVenta: 0,
    idProducto: 0,
    idVenta: 0,
    cantidad: 0,
    total: 0
  };
  venta: VentaModel = {
    idCliente: 0,
    idUsuario: 1,
    idVenta: 0,
    detalleVenta: this.detalleVenta
  };
  clientes: ClienteModel [] = [];
  constructor(
    private dialogRef: MatDialogRef<VentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoModel,
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private _snackBar: MatSnackBar,
    private util: Util,
    fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      producto: this.data.nombre,
      valorUnitario: this.data.valorUnitario,
      idCliente: 0,
      idUsuario: 1,
      cantidad: 1,
      total: this.data.valorUnitario
    })
  }

  ngOnInit(): void {
    this.getAllClientes();
  }

  processData(){
      this.save();
  }

  getAllClientes(){
    this.clienteService.getAll().subscribe({
      next: (response) => {
        this.clientes = response;
      }
    })
  }

  save() {
    this.venta.idCliente = this.formGroup.value.idCliente;
    this.venta.detalleVenta.cantidad = this.formGroup.value.cantidad;
    this.venta.detalleVenta.total = this.formGroup.value.total;
    this.venta.detalleVenta.idProducto = this.data.idProducto;
    this.ventaService.save(this.venta).subscribe({
      next: (response) => {
        if(response){
          this.util.openSnackBar(this._snackBar, "Venta registrada con éxito.", "X", "green-snackbar");
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

  getErrorMessage() {
    //return this.formControl.hasError('required') ? 'Campo obligatorio' : '';
  }

  calcularTotal(event: string) {
    const cantidad:number = parseInt(event, 10);
    let total:number = parseInt(this.formGroup.value.valorUnitario, 10);
    total *= cantidad;
    this.formGroup.patchValue({
      total
    });
  }
}
