import { UsuarioService } from './../../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Pago, UsuarioInformacion } from '../../../interface/usuario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  
  backEnd: string = environment.apiBackEnd;
  rutaImg: string = '/files/foto-usuario/';
  srcImg = `${this.backEnd}${this.rutaImg}`;
  informacionAlumno!: UsuarioInformacion;
  pago!: Pago;
  qr!: string;
  qrCodeDownloadLink: SafeUrl = "";
  registrarPago: FormGroup = this._formBuilder.group({
    referencia: ['xcvbxcvb', Validators.required],
    monto: ['234234', Validators.required],
    cuentaDestino: ['xcvbxcvb', Validators.required],
    formaPago: ['xcvxvbc', Validators.required],
    conceptoPago: ['xcvbxcvb', Validators.required],
    observaciones: ['xcvbbxcv', Validators.required],
    fechaPago: ['', Validators.required]
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.alumno()
  }
  alumno() {
    this._activatedRoute.params
      .pipe(switchMap(({ id }) => this._usuarioService.informacionAlumno(id)))
      .subscribe((respuesta) => {
        this.informacionAlumno = respuesta;
        this.qr = this.informacionAlumno.usuario.id;

        // verificar los pagos- falda definir los criterios 
        // let pagos = this.informacionAlumno.pagos?.filter((pago)=> pago.conceptoPago === 'Mensualidad')
        // let mesesDeAtrasos = this._usuarioService.verificarPago(pagos![0].fechaPago);
        // console.log(mesesDeAtrasos);

        console.log(this.informacionAlumno);
      });
  }
  agregarPago() {
    console.log(this.registrarPago.value);
    const { ...datosPago } = this.registrarPago.value;
    
    this.pago = {
      usuarioPerfil: this.informacionAlumno.id,
      ...this.registrarPago.value
    }
    console.log(this.pago);
    this._usuarioService.agregarPago(this.pago).subscribe(respuesta => {
      console.log(respuesta);
      this.alumno();
    });

  }

  descargarDocumentoInscripcion() {
    this._usuarioService.descargarDocumentoInscripcion(this.informacionAlumno.usuario.id).subscribe((respuesta: any) => {
      let blob = new Blob([respuesta], { type: 'application/docx' });
      let downloadURL = window.URL.createObjectURL(respuesta);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = `${this.informacionAlumno.informacionPersonal.folio}-${this.informacionAlumno.informacionPersonal.curp}-${this.informacionAlumno.usuario.nombre}`;
      link.click();
      // console.log(x)
    })
  }
  onChangeURL(url: SafeUrl) {
    console.log(url);
    this.qrCodeDownloadLink = url;
  }


}
