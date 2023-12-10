import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';
import { DayNamePipe } from './pipe/day-name.pipe';
registerLocaleData(localeEsMX, 'es-MX');

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // LoginSocialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
  ],
  providers: [
    {
      provide:LOCALE_ID, useValue:'es-MX'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
