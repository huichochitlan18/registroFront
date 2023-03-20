import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './usuario/agregar/agregar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaComponent } from './usuario/lista/lista.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';
import { EntradasComponent } from './registro-entradas-salidas/entradas/entradas.component';
import { SalidasComponent } from './registro-entradas-salidas/salidas/salidas.component';
import { CamaraComponent } from './test/camara/camara.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'usuario/:id', component: UsuarioComponent },
      { path: 'agregar-alumno', component: AgregarComponent },
      { path: 'lista-alumnos', component: ListaComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'entradas', component: EntradasComponent },
      { path: 'salidas', component: SalidasComponent },
      { path: 'test/camara', component: CamaraComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
