import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../module/material/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AgregarComponent } from './usuario/agregar/agregar.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, MenuComponent, AgregarComponent, DashboardComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,  
  ],
})
export class PagesModule {}
