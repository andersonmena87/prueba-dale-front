import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RolModel } from '../../models/Rol.model';
import { RolService } from 'src/app/services/rol.service';
import { RolComponent } from '../../componentes/roles/modal-rol/rol.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarRolComponent } from './modal-eliminar/eliminarRol.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['nombre', 'actions'];
  dataSource: MatTableDataSource<RolModel>;
  roles: RolModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private rolService: RolService,
    private datePipe: DatePipe,
  ) {
    this.dataSource = new MatTableDataSource(this.roles);
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.rolService.getAll().subscribe({
      next: (response) => {
        this.roles = response;
        this.dataSource = new MatTableDataSource(this.roles);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  create() {
    const dialogRef = this.dialog.open(RolComponent, {
      width: '50%',
      disableClose: true, data: {}
    });

    dialogRef.componentInstance.metodo = 'save';
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getAll();
    });
  }

  update(rol: RolModel) {
    const dialogRef = this.dialog.open(RolComponent, {
      width: '50%',
      disableClose: true, data: rol
    });

    dialogRef.componentInstance.metodo = 'update';
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
      this.getAll();
    });
  }

  delete(usuario: RolModel){
    const dialogRef = this.dialog.open(EliminarRolComponent, {
      width: '40%',
      disableClose: true, data: usuario
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
