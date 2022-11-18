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

import * as uuid from 'uuid';//solo para generar un id unico para poder eliminar los datos de la tabla del horario
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

  @ViewChild('stepper', { read: MatStepper }) stepper!: MatStepper;

  @ViewChild(MatTable) table!: MatTable<usuarioHorario>;
  displayedColumns: string[] = [
    'disciplina',
    'plan',
    'dia',
    'inicio',
    'acciones',
  ];

  horarioPlan: usuarioHorario[] = []; //para motrar los datos en la tabla de la vista
  horarioPlanForm: usuarioHorarioFormulario[] = []; //los datos q se envian en el formulario
  contacosEmergencia: usuarioContactoEmergencia[] = [];

  horarioInscripcion: any = [];

  catalogoAfiliacionMedica: catalogoAfiliacionMedica[] = [];
  catalogoDisciplina: catalogoDisciplina[] = [];
  catalogoDisciplinaPlan: catalogoDisciplinaPlan[] = [];

  catalogoCP: cp[] = [];
  catalogoCPFiltro: cp[] = [];

  horario = [
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];

  diasSemana = [
    {
      dia: 'lunes',
      id: 1,
    },
    {
      dia: 'martes',
      id: 2,
    },
    {
      dia: 'miercoles',
      id: 3,
    },
    {
      dia: 'jueves',
      id: 4,
    },
    {
      dia: 'viernes',
      id: 5,
    },
    {
      dia: 'sabado',
      id: 6,
    },
    {
      dia: 'domingo',
      id: 7,
    },
  ];

  //   public get usuario(): UsuarioService {
  //     return this._usuario;
  //   }
  //
  //   public set usuario(value: UsuarioService) {
  //     this._usuario = value;
  // }

  usuarioFormGroup = this._formBuilder.group({
    // folio: ['123456', Validators.required],
    correo: ['jose@jose.com', Validators.required],
    nombre: ['jose', Validators.required],
    apellidoPaterno: ['gonzalez', Validators.required],
    apellidoMaterno: ['gonzalez', Validators.required],
    // fechaNacimiento: [new Date(), Validators.required],
    // sexo: ['', Validators.required],
    // curp: ['asdfasdfasdf', Validators.required],
  });

  usuarioInformacionPersonalFormGroup = this._formBuilder.group({
    folio: ['123456', Validators.required],
    fechaNacimiento: [new Date(), Validators.required],
    sexo: ['', Validators.required],
    curp: ['asdfasdfasdf', Validators.required],
  });

  datosMedicosFormGroup = this._formBuilder.group({
    afiliacionMedica: ['', Validators.required],
    alergias: ['asdfasdf', Validators.required],
    padecimientos: ['asdfasdf', Validators.required],
    estatura: ['1.70', Validators.required],
    peso: ['90', Validators.required],
    tipoSangre: ['', Validators.required],
  });

  datosContactoFormGroup = this._formBuilder.group({
    numeroCelular: ['123456789', Validators.required],
    numeroCasa: ['123456789', Validators.required],
    cp: ['', Validators.required],
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    colonia: ['', Validators.required],
    calle: ['independencia', Validators.required],
    numero: ['', Validators.required],
  });

  datosContactoEmergenciaFormGroup = this._formBuilder.group({
    nombre: ['guadalupe', Validators.required],
    apellidoPaterno: ['guadalupe', Validators.required],
    apellidoMaterno: ['guadalupe', Validators.required],
    parentesco: ['asd', Validators.required],
    numeroCelular: ['123456789', Validators.required],
    numeroCasa: ['123456789', Validators.required],
    correo: ['asdasd@asdasd.com', Validators.required],
  });

  horarioFormGroup = this._formBuilder.group({
    disciplina: [1, Validators.required],
    plan: [1, Validators.required],
    dia: [1],
    inicio: [''],
    fin: [''],
  });

  datosFormGroup = this._formBuilder.group({
    usuario: [this.usuarioFormGroup],
    informacionPersonal: [this.usuarioInformacionPersonalFormGroup],
    informacionMedica: [this.datosMedicosFormGroup.value],
    informacionContacto: [this.datosContactoFormGroup.value],
    informacionContactoEmergencia: [this._formBuilder.array([])],
    horario: [this._formBuilder.array([])],
  });

  isEditable = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _usuarioSocialNetworkService: UsuarioSocialNetworkService,
    private _codigoPostalService: CodigoPostalService,
    private _usuarioService: UsuarioService,
    private _catalogosService: CatalogosService
  ) {}
  ngOnInit(): void {
    this.listaAfiliacionMedica();
    this.listaDisciplina();
  }

  agregarATabla() {
    this.horarioPlan.push({
      id: uuid.v4(),
      disciplina: this.catalogoDisciplina.find(
        (disciplia) =>
          disciplia.id === this.horarioFormGroup.get('disciplina')?.value
      )?.disciplina,
      disciplinaid: this.horarioFormGroup.get('disciplina')?.value || undefined,
      plan: this.catalogoDisciplinaPlan.find(
        (plan) => plan.id === this.horarioFormGroup.get('plan')?.value
      )?.plan,
      planid: this.horarioFormGroup.get('plan')?.value || undefined,
      dia: this.diasSemana.find(
        (dia) => dia.id === this.horarioFormGroup.get('dia')?.value
      )?.dia,
      diaid: this.horarioFormGroup.get('dia')?.value || undefined,
      inicio: this.horarioFormGroup.get('inicio')?.value || undefined,
      fin: this.horarioFormGroup.get('fin')?.value || undefined,
    });

    this.table.renderRows();
  }

  crearUsuario() {
    this.datosFormGroup.get('usuario')?.patchValue(this.usuarioFormGroup.value);

    this.datosFormGroup
      .get('informacionPersonal')
      ?.patchValue(this.usuarioInformacionPersonalFormGroup.value);

    this.datosFormGroup
      .get('informacionContacto')
      ?.patchValue(this.datosContactoFormGroup.value);

    this.datosFormGroup
      .get('informacionMedica')
      ?.patchValue(this.datosMedicosFormGroup.value);

    this.contacosEmergencia.push({
      nombre:
        this.datosContactoEmergenciaFormGroup.get('nombre')?.value || undefined,
      apellidoPaterno:
        this.datosContactoEmergenciaFormGroup.get('apellidoPaterno')?.value ||
        undefined,
      apellidoMaterno:
        this.datosContactoEmergenciaFormGroup.get('apellidoMaterno')?.value ||
        undefined,
      parentesco:
        this.datosContactoEmergenciaFormGroup.get('parentesco')?.value ||
        undefined,
      numeroCelular:
        this.datosContactoEmergenciaFormGroup.get('numeroCelular')?.value ||
        undefined,
      numeroCasa:
        this.datosContactoEmergenciaFormGroup.get('numeroCasa')?.value ||
        undefined,
      correo:
        this.datosContactoEmergenciaFormGroup.get('correo')?.value || undefined,
    });

    this.horarioPlan.forEach((horario) => {
      this.horarioPlanForm.push({
        disciplina: horario.disciplinaid,
        plan: horario.planid,
        dia: horario.diaid,
        inicio: horario.inicio,
        fin: horario.fin,
      });
    });

    this.datosFormGroup
      .get('informacionContactoEmergencia')
      ?.patchValue(this.contacosEmergencia);

    this.datosFormGroup.get('horario')?.patchValue(this.horarioPlanForm);

    this._usuarioService
      .registrar(this.datosFormGroup.value)
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        if (respuesta.datosMedicos) {
          // this._usuarioRegistro.descargarDocumento().subscribe((respuesta)=>{
          //   const blob = new Blob([respuesta], { type: 'docx' });
          //   const url= window.URL.createObjectURL(blob);
          //   window.open(url);
          // });
        }
      });
    this.stepper.reset();
    this.contacosEmergencia = [];
    this.horarioPlanForm = [];
  }

  codigosPostalesLista(cp: string) {
    if (cp.length == 5) {
      this._codigoPostalService.codigoPostal(cp).subscribe((codigoPostal) => {
        this.catalogoCP = codigoPostal;

        this.datosContactoFormGroup
          .get('estado')
          ?.patchValue(this.catalogoCP[0].estado);

        this.datosContactoFormGroup
          .get('municipio')
          ?.patchValue(this.catalogoCP[0].municipio);

        this.datosContactoFormGroup.controls['colonia'].setValue('');
        // this.thirdFormGroup.get('localidad')?.patchValue.();
        console.log(this.catalogoCP);
      });
    }
  }

  codigosPostalesLocalidad(localidad: string): string {
    // console.log(localidad);
    return this.catalogoCP.find((x) => x.localidad === localidad)?.localidad!;
  }

  codigosPostalesfilter(cp: string): void {
    // Moneda = Moneda.toLowerCase();
    // if (cp.length == 5) {
    console.log(cp);
    this.catalogoCPFiltro = this.catalogoCP.filter((codigoPostal) =>
      codigoPostal.localidad
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(cp)
    );
    // }
  }
  
  listaAfiliacionMedica() {
  
    this._catalogosService
      .afiliacionMedica()
      .pipe(
        catchError(() => {
          return EMPTY;
          // return throwError(()=> new Error('error en la peticion'))
        })
      )
      .subscribe({
        next: (afiliacionMedica) => {
          this.catalogoAfiliacionMedica = afiliacionMedica;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  listaDisciplina() {
    this._catalogosService
      .disciplina()
      .pipe(
        catchError(() => {
          return EMPTY;
          // return throwError(()=> new Error('error en la peticion'))
        })
      )
      .subscribe({
        next: (disciplina) => {
          this.catalogoDisciplina = disciplina;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  listaPlan(plan: number) {
    this._catalogosService
      .plan(plan)
      .pipe(
        catchError(() => {
          return EMPTY;
          // return throwError(()=> new Error('error en la peticion'))
        })
      )
      .subscribe({
        next: (plan) => {
          this.catalogoDisciplinaPlan = plan;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  eliminarClase(id: string) {
    // console.log(id);

    this.horarioPlan = this.horarioPlan.filter((horario) => horario.id !== id);
    // console.log(this.horarioPlan);

    this.horarioInscripcion = this.horarioPlan.map(({ id, ...rest }) => {
      // console.log(rest);
      return rest;
    });

    this.datosFormGroup.get('horario')?.patchValue(this.horarioInscripcion);
    // console.log(this.horarioInscripcion);
    this.table.renderRows();
  }
}
