import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cp } from './interface/cp-interface';

import { CatalogosService } from './service/catalogo.service';
import { catchError, EMPTY } from 'rxjs';
import { catalogoAfiliacionMedica } from './interface/catalogo-afiliacionMedica';
import { catalogoDisciplina } from './interface/catalogo-disciplina';
import { catalogoDisciplinaPlan } from './interface/catalogo-disciplinaPlan';

import { usuarioHorario } from './interface/usuario-horario';
import { MatTable } from '@angular/material/table';


import { usuarioHorarioFormulario } from './interface/usuario-horario-formuilario';
import { usuarioContactoEmergencia } from './interface/usuario-contacto-emergencia';
import { MatStepper } from '@angular/material/stepper';
import { UsuarioSocialNetworkService } from './service/usuario-social-network.service';
import { CodigoPostalService } from './service/cp.service';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inscripciones';

 

  constructor(
   
  ) {}
  ngOnInit(): void {
   
  }

 
}
