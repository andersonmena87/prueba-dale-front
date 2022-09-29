import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteModel } from '../../models/Cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteComponent } from '../clientes/modal-cliente/cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarClienteComponent } from './modal-eliminar/eliminarCliente.component';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [Util]
})
export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nombre', 'apellido', 'cedula', 'telefono','actions'];
  dataSource: MatTableDataSource<ClienteModel>;
  clientes: ClienteModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private util: Util
  ) {
    this.dataSource = new MatTableDataSource(this.clientes);
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.clienteService.getAll().subscribe({
      next: (response) => {
        this.clientes = response;
        this.dataSource = new MatTableDataSource(this.clientes);
        this.dataSource.sort = this.sort;
        this.paginator._intl =  this.util.TranslatePaginator();
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  create() {
    const dialogRef = this.dialog.open(ClienteComponent, {
      width: '50%',
      disableClose: true, data: {}
    });

    dialogRef.componentInstance.metodo = 'save';
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getAll();
    });
  }

  update(cliente: ClienteModel) {
    const dialogRef = this.dialog.open(ClienteComponent, {
      width: '50%',
      disableClose: true, data: cliente
    });

    dialogRef.componentInstance.metodo = 'update';
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getAll();
    });
  }

  delete(cliente: ClienteModel){
    const dialogRef = this.dialog.open(EliminarClienteComponent, {
      width: '40%',
      disableClose: true, data: cliente
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
