import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cp } from './interface/cp-interface';
import { CodigoPostal } from './service/cp.service';
import { UsuarioService } from './service/usuario.service';
import { UsuarioRegistro } from './service/usuario-registro.service';
import { Catalogos } from './service/catalogo.service';
import { catchError, EMPTY } from 'rxjs';
import { catalogoAfiliacionMedica } from './interface/catalogo-afiliacionMedica';
import { catalogoDisciplina } from './interface/catalogo-disciplina';
import { catalogoDisciplinaPlan } from './interface/catalogo-disciplinaPlan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inscripciones';

  catalogoAfiliacionMedica: catalogoAfiliacionMedica[] = [];
  catalogoDisciplina: catalogoDisciplina[] = [];
  catalogoDisciplinaPlan: catalogoDisciplinaPlan[] = [];

  catalogoCP: cp[] = [];
  catalogoCPFiltro: cp[] = [];
  horario = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ];
  public get usuario(): UsuarioService {
    return this._usuario;
  }

  public set usuario(value: UsuarioService) {
    this._usuario = value;
  }
  formJoin?: FormGroup;

  secondFormGroup = this._formBuilder.group({
    afiliacionMedica: ['', Validators.required],
    alergias: ['asdfasdf', Validators.required],
    padecimientos: ['asdfasdf', Validators.required],
    estatura: ['1.70', Validators.required],
    peso: ['90', Validators.required],
    tipoSangre: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    numeroCelular: ['123456789', Validators.required],
    numeroCasa: ['123456789', Validators.required],
    cp: ['', Validators.required],
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    colonia: ['', Validators.required],
    calle: ['independencia', Validators.required],
    numero: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    nombre: ['guadalupe', Validators.required],
    apellidoPaterno: ['guadalupe', Validators.required],
    apellidoMaterno: ['guadalupe', Validators.required],
    parentesco: ['asd', Validators.required],
    numeroCelular: ['123456789', Validators.required],
    numeroCasa: ['123456789', Validators.required],
    correo: ['asdasd@asdasd.com', Validators.required],
  });

  fifthFormGroup = this._formBuilder.group({
    disciplina: ['1', Validators.required],
    plan: ['1', Validators.required],
    lunes: [''],
    martes: [''],
    miercoles: [''],
    jueves: [''],
    viernes: [''],
    sabado: [''],
    doming: [''],
  });

  firstFormGroup = this._formBuilder.group({
    folio: ['123456', Validators.required],
    correo: ['jose@jose.com', Validators.required],
    nombre: ['jose', Validators.required],
    apellidoPaterno: ['gonzalez', Validators.required],
    apellidoMaterno: ['gonzalez', Validators.required],
    fechaNacimiento: ['', Validators.required],
    sexo: ['', Validators.required],
    curp: ['asdfasdfasdf', Validators.required],
    datosMedicos: [this.secondFormGroup.value],
    datosContacto: [this.thirdFormGroup.value],
    datosContactoEmergencia: [this.fourthFormGroup.value],
    horario: [this.fifthFormGroup.value],
  });

  isEditable = false;

  constructor(
    private _usuario: UsuarioService,
    private _formBuilder: FormBuilder,
    private _codigoPostal: CodigoPostal,
    private _usuarioRegistro: UsuarioRegistro,
    private _catalogos: Catalogos
  ) {}
  ngOnInit(): void {
    // this.codigosPostalesLista();
    // this.listaFormaPago();
    // this.listaMetodoPago();
    // this.listaMoneda();
    // console.log(this.filter());
    this.listaAfiliacionMedica();
    this.listaDisciplina();
  }

  test(test:any){
    console.log(test);
  }

  datos() {
    this.firstFormGroup
      .get('datosMedicos')
      ?.patchValue(this.secondFormGroup.value);
    this.firstFormGroup
      .get('datosContacto')
      ?.patchValue(this.thirdFormGroup.value);
    this.firstFormGroup
      .get('datosContactoEmergencia')
      ?.patchValue(this.fourthFormGroup.value);
    this.firstFormGroup.get('horario')?.patchValue(this.fifthFormGroup.value);
    console.log(this.firstFormGroup.value);
    this._usuarioRegistro
      .registrar(this.firstFormGroup.value)
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
        this.thirdFormGroup
          .get('estado')
          ?.patchValue(this.catalogoCP[0].estado);
        this.thirdFormGroup
          .get('municipio')
          ?.patchValue(this.catalogoCP[0].municipio);
        this.thirdFormGroup.controls['colonia'].setValue('');
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
  listaPlan(plan:number) {
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
}
