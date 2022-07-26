import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioComponent } from './componentes/usuarios/modal-usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { EliminarUsuarioComponent } from './componentes/usuarios/modal-eliminar/eliminarUsuario.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { RolComponent } from './componentes/roles/modal-rol/rol.component';
import { EliminarRolComponent } from './componentes/roles/modal-eliminar/eliminarRol.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductoComponent } from './componentes/productos/modal-producto/producto.component';
import { EliminarProductoComponent } from './componentes/productos/modal-eliminar/eliminarProducto.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ClienteComponent } from './componentes/clientes/modal-cliente/cliente.component';
import { EliminarClienteComponent } from './componentes/clientes/modal-eliminar/eliminarCliente.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { VentaComponent } from './componentes/ventas/modal-venta/venta.component';
import { EliminarVentaComponent } from './componentes/ventas/modal-eliminar/eliminarVenta.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { DetalleVentasComponent } from './componentes/detalleVentas/detalleVentas.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuarioComponent,
    EliminarUsuarioComponent,
    RolesComponent,
    RolComponent,
    EliminarRolComponent,
    ProductosComponent,
    ProductoComponent,
    EliminarProductoComponent,
    ClientesComponent,
    ClienteComponent,
    EliminarClienteComponent,
    VentasComponent,
    VentaComponent,
    EliminarVentaComponent,
    MenuComponent,
    DetalleVentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
