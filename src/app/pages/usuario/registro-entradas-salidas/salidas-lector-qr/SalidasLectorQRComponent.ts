import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioInformacion } from 'src/app/interface/usuario.interface';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-salidas-lector-qr',
  templateUrl: './salidas-lector-qr.component.html',
  styleUrls: ['./salidas-lector-qr.component.scss']
})
export class SalidasLectorQRComponent implements OnInit {
  private _usuarioService = inject(UsuarioService);
  private _formBuilder = inject(FormBuilder);
  entrada!: any;
  qrFormGroup = this._formBuilder.group({
    qr: ['asdasd', Validators.required]
  });
  alumno!: UsuarioInformacion;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(typeof(this.qrFormGroup.value.qr));
    const qr:string = this.qrFormGroup.value.qr!;
    this._usuarioService.informacionAlumno(qr).subscribe(alumno=>{
      console.log(alumno);
      this.alumno = alumno;
      this.entrada = {
        tipo: "salida",
        usuarioPerfil: alumno.id
      }
      this._usuarioService.registrarEntradaSalida(this.entrada).subscribe(entrada => {
        console.log(entrada)
      });
    })
  }
}
