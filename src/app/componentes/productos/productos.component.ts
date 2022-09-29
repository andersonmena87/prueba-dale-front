import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoModel } from '../../models/Producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoComponent } from '../productos/modal-producto/producto.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarProductoComponent } from './modal-eliminar/eliminarProducto.component';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [Util]
})
export class ProductosComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nombre', 'valorUnitario','actions'];
  dataSource: MatTableDataSource<ProductoModel>;
  productos: ProductoModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private productoService: ProductoService,
    private util: Util
  ) {
    this.dataSource = new MatTableDataSource(this.productos);
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.productoService.getAll().subscribe({
      next: (response) => {
        this.productos = response;
        this.dataSource = new MatTableDataSource(this.productos);
        this.dataSource.sort = this.sort;
        this.paginator._intl =  this.util.TranslatePaginator();
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  create() {
    const dialogRef = this.dialog.open(ProductoComponent, {
      width: '50%',
      disableClose: true, data: {}
    });

    dialogRef.componentInstance.metodo = 'save';
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getAll();
    });
  }

  update(producto: ProductoModel) {
    const dialogRef = this.dialog.open(ProductoComponent, {
      width: '50%',
      disableClose: true, data: producto
    });

    dialogRef.componentInstance.metodo = 'update';
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getAll();
    });
  }

  delete(producto: ProductoModel){
    const dialogRef = this.dialog.open(EliminarProductoComponent, {
      width: '40%',
      disableClose: true, data: producto
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getAll();
    });
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
