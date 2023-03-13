import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MaterialModule } from '../module/material/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AgregarComponent } from './usuario/agregar/agregar.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaComponent } from './usuario/lista/lista.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';
import { EntradasComponent } from './registro-entradas-salidas/entradas/entradas.component';
import { SalidasComponent } from './registro-entradas-salidas/salidas/salidas.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [HomeComponent, MenuComponent, AgregarComponent, DashboardComponent, ListaComponent, UsuarioComponent, EntradasComponent, SalidasComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ZXingScannerModule,
    MaterialModule,
    QRCodeModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class PagesModule {}
