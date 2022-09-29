import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentaModel } from '../../models/Venta.model';
import { VentaService } from 'src/app/services/venta.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaComponent } from '../ventas/modal-venta/venta.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModel } from 'src/app/models/Producto.model';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [Util]
})

export class VentasComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nombre', 'valorUnitario', 'actions'];
  dataSource: MatTableDataSource<ProductoModel>;
  ventas: VentaModel[] = [];
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

  create(producto: ProductoModel) {
    const dialogRef = this.dialog.open(VentaComponent, {
      width: '50%',
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
