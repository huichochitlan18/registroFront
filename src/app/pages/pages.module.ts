import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MaterialModule } from '../module/material/material.module';
import { AgregarComponent } from './usuario/agregar/agregar.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaComponent } from './usuario/lista/lista.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';

import { QRCodeModule } from 'angularx-qrcode';
import { WebcamModule } from 'ngx-webcam';
import { CamaraComponent } from './test/camara/camara.component';
import { EntradasComponent } from './usuario/registro-entradas-salidas/entradas/entradas.component';
import { SalidasComponent } from './usuario/registro-entradas-salidas/salidas/salidas.component';
import { PagesRoutingModule } from './pages-routing.module';
import { EntradasLectorQRComponent } from './usuario/registro-entradas-salidas/entradas-lector-qr/entradas-lector-qr.component';
import { SalidasLectorQRComponent } from './usuario/registro-entradas-salidas/salidas-lector-qr/SalidasLectorQRComponent';
import { ListaRegistrosComponent } from './usuario/registro-entradas-salidas/lista-registros/lista-registros.component';
import { DayNamePipe } from '../pipe/day-name.pipe';

@NgModule({
  declarations: [DayNamePipe, HomeComponent, MenuComponent, AgregarComponent, DashboardComponent, ListaComponent, UsuarioComponent, EntradasComponent, SalidasComponent, CamaraComponent, EntradasLectorQRComponent, SalidasLectorQRComponent, ListaRegistrosComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ZXingScannerModule,
    MaterialModule,
    QRCodeModule,
    WebcamModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class PagesModule { }
