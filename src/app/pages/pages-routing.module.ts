import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './usuario/agregar/agregar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaComponent } from './usuario/lista/lista.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';

import { CamaraComponent } from './test/camara/camara.component';
import { EntradasComponent } from './usuario/registro-entradas-salidas/entradas/entradas.component';
import { SalidasComponent } from './usuario/registro-entradas-salidas/salidas/salidas.component';
import { EntradasLectorQRComponent } from './usuario/registro-entradas-salidas/entradas-lector-qr/entradas-lector-qr.component';
import { SalidasLectorQRComponent } from './usuario/registro-entradas-salidas/salidas-lector-qr/SalidasLectorQRComponent';
import { ListaRegistrosComponent } from './usuario/registro-entradas-salidas/lista-registros/lista-registros.component';

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
      { path: 'entradasQR', component: EntradasLectorQRComponent },
      { path: 'salidasQR', component: SalidasLectorQRComponent },
      { path: 'entradas-salidas', component: ListaRegistrosComponent },
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
