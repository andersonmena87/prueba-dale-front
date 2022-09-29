import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentaModel } from '../../models/Venta.model';
import { VentaService } from 'src/app/services/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModel } from 'src/app/models/Producto.model';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-detalleVentas',
  templateUrl: './detalleVentas.component.html',
  styleUrls: ['./detalleVentas.component.scss'],
  providers: [Util]
})

export class DetalleVentasComponent implements OnInit, AfterViewInit {
  displayedColumns = ['cliente', 'producto', 'valorUnitario', 'cantidad', 'total'];
  dataSource: MatTableDataSource<VentaModel>;
  ventas: VentaModel[] = [];
  productos: ProductoModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private ventaService: VentaService,
    private util: Util
  ) {
    this.dataSource = new MatTableDataSource(this.ventas);
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.ventaService.getAll().subscribe({
      next: (response) => {
        this.ventas = response;
        this.dataSource = new MatTableDataSource(this.ventas);
        this.dataSource.sort = this.sort;
        this.paginator._intl =  this.util.TranslatePaginator();
        this.dataSource.paginator = this.paginator;
      }
    })
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
