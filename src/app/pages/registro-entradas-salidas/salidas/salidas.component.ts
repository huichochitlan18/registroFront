import { Component, OnInit, ViewChild } from '@angular/core';
import { Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BehaviorSubject } from 'rxjs';
import { UsuarioInformacion } from 'src/app/interface/usuario.interface';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {
  @ViewChild('scanner', { static: false }) scanner!: ZXingScannerComponent;
  hasDevices!: boolean;
  hasPermission!: boolean;
  qrPrimero!: string;
  qrSegundo!: string;
  qrResult!: Result;
  torchEnabled = false;
  availableDevices!: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo | undefined | null = null;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  entrada!: any;
  acceso: any = false || true || undefined;
  alumno!: UsuarioInformacion;
  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.acceso = undefined;
    console.log(this.acceso);
  }
  test() {
    console.log(this.scanner);
  }
  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }
  camerasNotFound(e: Event) {
    // Display an alert modal here
  }
  cameraFound(devices: MediaDeviceInfo[]) {
    console.log(devices)
    this.availableDevices = devices;
    // Log to see if the camera was found
  }
  onScanSuccess(result: string) {
    console.log(result);
  }
  displayCameras(cameras: MediaDeviceInfo[]) {
    console.debug('Devices: ', cameras);
    // this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
    console.debug('Result: ', resultString);
    // this.qrResultString = resultString;
  }

  onDeviceSelectChange(selectedValue: any) {
    console.log('Selection changed: ', selectedValue);
    const device = this.availableDevices.find(x => x.deviceId === selectedValue);
    this.scanner.device = device;
    // this.currentDevice = this.scanner.getAnyVideoDevice(selectedValue);
  }
  onCodeResult(resultString: string) {
    this.qrPrimero = resultString;
    this.registrar();
    // console.log(this.qrPrimero);
  }
  registrar() {
    this._usuarioService.informacionAlumno(this.qrPrimero).subscribe(alumno => {
      console.log(alumno);
      if (alumno === null) {
        this.acceso = false;
        setTimeout(() => {
          this.acceso = null
        }, 2000);
      }
      if (alumno) {
        this.acceso = true;
        this.alumno = alumno;
        this.entrada = {
          tipo: "salida",
          usuarioPerfil: alumno.id
        }
        setTimeout(() => {
          this.acceso = null
        }, 2000);
        console.log(this.alumno)
      }

    })
    if (this.entrada) {
      if (this.qrPrimero !== this.qrSegundo) {
        this.qrSegundo = this.qrPrimero;
        this._usuarioService.registrarEntradaSalida(this.entrada).subscribe(entrada => {
          console.log(entrada)
        });
      }
    }

  }
}
