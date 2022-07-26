import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { DetalleVentasComponent } from './componentes/detalleVentas/detalleVentas.component';

const routes: Routes = [
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'detalleVentas', component: DetalleVentasComponent},
  { path: '**', redirectTo: "ventas", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
