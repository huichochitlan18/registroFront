import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Inscripcion, UsuarioInformacion } from 'src/app/interface/usuario.interface';
import { UsuarioService } from 'src/app/service/usuario.service';
@Component({
  selector: 'app-entradas-lector-qr',
  templateUrl: './entradas-lector-qr.component.html',
  styleUrls: ['./entradas-lector-qr.component.scss']
})
export class EntradasLectorQRComponent implements OnInit {

  private _usuarioService = inject(UsuarioService);
  private _formBuilder = inject(FormBuilder);

  atrasoPagos: number = 0;
  permisoHorario: boolean = false || true || undefined;
  permisoDia: boolean = false || true || undefined;
  acceso: any = false || true || undefined;
  entrada!: any | undefined;
  qrFormGroup = this._formBuilder.group({
    qr: ['', Validators.required]
  });
  alumno!: UsuarioInformacion | undefined;
  constructor() { }

  ngOnInit(): void {
 
  }
  onSubmit() {
    console.log(typeof (this.qrFormGroup.value.qr));
    const qr: string = this.qrFormGroup.value.qr!;
    
    this._usuarioService.informacionAlumno(qr).subscribe(async alumno => {
      console.log(alumno);
      this.alumno = alumno;
      //se ordena los pagos, no se hace desde el back para q sea los recursos de la propia pc del cliente sea el que procese los datos ahorrando recursos en el back
      let pagos = this.alumno.pagos?.filter(pago => pago.conceptoPago === 'Mensualidad')
      pagos?.sort((b, a) => new Date(a.fechaPago).getTime() - new Date(b.fechaPago).getTime());

      this.atrasoPagos = this._usuarioService
        .verificarPago(pagos![0].fechaPago);
      this.permisoHorario = this._usuarioService
        .verificarHoraEntrada(this.alumno.inscripcion[0].inicio, this.alumno.inscripcion[0].fin);
      this.permisoDia = this._usuarioService
        .verificaDia(this.alumno.inscripcion);

      if (this.atrasoPagos<3 && this.permisoHorario==true && this.permisoDia == true){
        this.acceso= true;
        this.entrada = {
          tipo: "entrada",
          usuarioPerfil: alumno.id
        }
        this._usuarioService.registrarEntradaSalida(this.entrada).subscribe(entrada => {
          console.log(entrada)
        });
        setTimeout(() => {
          this.resetValues();
        }, 2000);
      }else{
        this.acceso= false;
        setTimeout(() => {
          this.resetValues();
        }, 3000);
        console.log("no tiene permiso");
      }   
    })
  }
  resetValues(){
    this.atrasoPagos = 0;
    this.alumno = undefined;
    this.permisoHorario = false;
    this.permisoDia = false;
    this.acceso = undefined;
    this.entrada = undefined;
    this.qrFormGroup.reset();
  }


}
