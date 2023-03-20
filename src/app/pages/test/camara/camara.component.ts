import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss']
})
export class CamaraComponent implements OnInit {
  private trigger: Subject<void> = new Subject<void>();
  // latest snapshot
  public webcamImage!: WebcamImage;
  public allowCameraSwitch = true;
  public showWebcam = true;
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public multipleWebcamsAvailable = false;
  public deviceId!: string;
  public errors: WebcamInitError[] = [];
  public camarasDisponibles: MediaDeviceInfo[]=[];
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  // private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  constructor() { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      console.log(mediaDevices);
      this.camarasDisponibles = mediaDevices;
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  cambiarCamara(selectedValue: any){
    console.log(selectedValue);
    this.deviceId = selectedValue;
    this.nextWebcam.next(selectedValue);
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }

}
