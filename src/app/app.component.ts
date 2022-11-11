import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { cp } from './interface/cp-interface';
import { CodigoPostal } from './service/cp.service';
import { UsuarioService } from './service/usuario.service';
import { UsuarioRegistro } from './service/usuario-registro.service';
import { Catalogos } from './service/catalogo.service';
import { catchError, EMPTY } from 'rxjs';
import { catalogoAfiliacionMedica } from './interface/catalogo-afiliacionMedica';
import { catalogoDisciplina } from './interface/catalogo-disciplina';
import { catalogoDisciplinaPlan } from './interface/catalogo-disciplinaPlan';

import { usuarioHorario } from './interface/usuario-horario';
import { MatTable } from '@angular/material/table';

import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inscripciones';

  @ViewChild(MatTable) table!: MatTable<usuarioHorario>;

  horarioPlan: usuarioHorario[] = [];

  selected = 1;
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
    folio: ['123456', Validators.required],
    correo: ['jose@jose.com', Validators.required],
    nombre: ['jose', Validators.required],
    apellidoPaterno: ['gonzalez', Validators.required],
    apellidoMaterno: ['gonzalez', Validators.required],
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
    datosMedicos: [this.datosMedicosFormGroup.value],
    datosContacto: [this.datosContactoFormGroup.value],
    datosContactoEmergencia: [this.datosContactoEmergenciaFormGroup.value],
    horario: [this._formBuilder.array([])],
  });

  displayedColumns: string[] = [
    'disciplina',
    'plan',
    'dia',
    'inicio',
    'acciones',
  ];

  isEditable = false;

  constructor(
    private _usuario: UsuarioService,
    private _formBuilder: FormBuilder,
    private _codigoPostal: CodigoPostal,
    private _usuarioRegistro: UsuarioRegistro,
    private _catalogos: Catalogos
  ) {}
  ngOnInit(): void {
    console.log(this.diasSemana);

    // this.codigosPostalesLista();
    // this.listaFormaPago();
    // this.listaMetodoPago();
    // this.listaMoneda();
    // console.log(this.filter());
    this.listaAfiliacionMedica();
    this.listaDisciplina();
  }

  test(test: any) {
    this.horarioPlan.push({
      id: uuid.v4(),
      disciplina: this.catalogoDisciplina.find(
        (disciplia) =>
          disciplia.id === this.horarioFormGroup.get('disciplina')?.value
      )?.disciplina,
      plan: this.catalogoDisciplinaPlan.find(
        (plan) => plan.id === this.horarioFormGroup.get('plan')?.value
      )?.plan,
      dia: this.diasSemana.find(
        (dia) => dia.id === this.horarioFormGroup.get('dia')?.value
      )?.dia,
      inicio: this.horarioFormGroup.get('inicio')?.value || undefined,
      fin: this.horarioFormGroup.get('fin')?.value || undefined,
    });

    console.log(this.horarioPlan);
    console.log(this.horarioFormGroup.value);

    // this.datosFormGroup.get('horario')?.patchValue(this.horarioFormGroup.value);

    this.table.renderRows();
  }

  datos() {
    this.datosFormGroup.get('usuario')?.patchValue(this.usuarioFormGroup.value);

    this.datosFormGroup
      .get('datosContacto')
      ?.patchValue(this.datosContactoFormGroup.value);

    this.datosFormGroup
      .get('datosMedicos')
      ?.patchValue(this.datosMedicosFormGroup.value);

    this.datosFormGroup
      .get('datosContactoEmergencia')
      ?.patchValue(this.datosContactoEmergenciaFormGroup.value);

    // this.datosFormGroup.get('horario')?.patchValue(this.horarioFormGroup.value);

    console.log(this.datosFormGroup.value);

    this._usuarioRegistro
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
  }

  codigosPostalesLista(cp: string) {
    if (cp.length == 5) {
      this._codigoPostal.codigoPostal(cp).subscribe((codigoPostal) => {
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
    // console.log(cp+"asdfasdf");
    // localidad = localidad.toLowerCase();
    console.log(localidad);
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
  // displayFn(value?: number) {
  //   return value ? this.catalogoCPFiltro.find(x => x.cp === value).name : undefined;
  // }
  listaAfiliacionMedica() {
    // this.catalogosService.tipoDeComprobante().subscribe((TipoDeComprobante) => {
    //   this.catalogoTipoDeComprobante = TipoDeComprobante;
    //  console.log(TipoDeComprobante);
    // });
    this._catalogos
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
    this._catalogos
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
    this._catalogos
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
