import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cp } from '../interface/cp-interface';
import { UsuarioInformacion, InformacionContacto, Pago, Inscripcion } from '../interface/usuario.interface';
import { EntradasSalidas } from '../interface/usuario-lista-entradas-salidas.interface';
import { format, formatInTimeZone } from 'date-fns-tz';
import { Paginacion } from '../interface/paginacion.interface';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private backEnd: string = environment.apiBackEnd;
  timeZone: string = 'America/Mexico_City';
  constructor(private http: HttpClient) { }

  registrar(data: any): Observable<any> {
    // console.log(data);
    return this.http.post<any>(
      `${this.backEnd}/usuarios/registrar-alumno`,
      data
    );
  }
  listaAlumnos(paginacion?: Paginacion): Observable<UsuarioInformacion[]> {
    paginacion = paginacion || { limit: 30, offset: 0 };
    return this.http.get<UsuarioInformacion[]>(`${this.backEnd}/usuarios?limit=${paginacion.limit}&offset=${paginacion.offset}`);
  }
  search(q:string): Observable<UsuarioInformacion[]> {
    return this.http.get<UsuarioInformacion[]>(`${this.backEnd}/usuarios/search/${q}`);
  }
  informacionAlumno(id: string): Observable<UsuarioInformacion> {
    return this.http.get<UsuarioInformacion>(`${this.backEnd}/usuarios/${id}`);
  }
  agregarPago(pago: Pago) {
    return this.http.post<Pago>(`${this.backEnd}/usuarios/pago/`, pago);
  }
  registrarEntradaSalida(entrada: any) {
    return this.http.post<any>(`${this.backEnd}/usuarios/entrada-salida/`, entrada);
  }

  descargarDocumentoInscripcion(id: string) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };

    return this.http.get(`${this.backEnd}/usuarios/documento/${id}`, httpOptions);
  }
  // descargarDocumento(): Observable<any>{
  //   return this.http.get<any>(`${this.backEnd}/usuarios/documento` {responseType: 'blob'});
  // }
  subirImagenPerfil(imagen: any) {
    // console.log(imagen);
    return this.http.post(`${this.backEnd}/files/foto-usuario/`, imagen);
  }
  listaRegistrosEntradasSalidas() {
    return this.http.get<EntradasSalidas[]>(`${this.backEnd}/usuarios/listaRegistrosEntradasSalidas`);
  }
  verificarPago(fechaPago: Date): number {
    //no se uso getMonth por que hace cosas extranas a inicios de mes y fin de mes 
    const mesPago: number = parseInt(fechaPago.toString().split('-')[1]);
    const mesActual: number = parseInt(
      formatInTimeZone(
        new Date().toISOString(), this.timeZone, 'yyyy-MM-dd')
        .split('-')[1]); // 2014-10-25 06:46:20-04:00 'yyyy-MM-dd HH:mm:ssXXX'
    console.log("retrazo en pagos " + mesPago, mesActual)
    return mesActual - mesPago;
    // let fechatest:string = "2023-10-01";
    // const splitFecha = fechatest.split('-');  
    // const year:number = parseInt(splitFecha[0]);
    // const mount:number = parseInt(splitFecha[1]);
    // const day:number = parseInt(splitFecha[2]);
    // const asdf = new Date().toISOString();
    // const testfecha = new Date(year,mount,day);
    // let asdffd = formatInTimeZone(asdf, this.timeZone, 'yyyy-MM-dd HH:mm:ssXXX') // 2014-10-25 06:46:20-04:00
    // console.log(year,mount,day);
    // console.log(asdffd);
    //retorna 8
    // const testfecha2 = new Date("2023-10-02");
    // console.log(testfecha2.getMonth()+1);
    //retorna 9
    // let asd = fechaPago.getMonth() - fechaActual.getMonth();
  }
  compararMeses(fecha: Date, fecha2: Date): number {

    return 1
  }
  dateFormatInTimeZone(fechaPago: Date) {
    const fecha = formatInTimeZone(new Date().toISOString(), this.timeZone, 'yyyy-MM-dd HH:mm:ssXXX');
    return fecha;
  }
  verificarHoraEntrada(_horaEntrada: string, _horaSalida: string): boolean {
    const hoy = new Date();
    const horaSimulada = new Date();
    horaSimulada.setHours(8, 40, 0, 0);

    const [horaEntrada, minutosEntrada, segundosEntrada] = _horaEntrada.split(':');
    const [horaSalida, minutosSalida, segundosSalida] = _horaSalida.split(':');


    const toleranciaEntrada = new Date();
    toleranciaEntrada.setHours(Number(horaEntrada), 0, 0, 0)
    toleranciaEntrada.setMinutes(toleranciaEntrada.getMinutes() - 15);

    const horaDeSalida = new Date();
    horaDeSalida.setHours(Number(horaSalida), 0, 0, 0)
    console.log(hoy)
    console.log(toleranciaEntrada);
    // if (hoy > toleranciaEntrada && hoy < horaDeSalida) {
    //   this.permisoHorario = true;
    //   console.log("es su hora de entrada")
    // }
    // else {
    //   this.permisoHorario = false;
    //   console.log("no es su hora de entrada")
    // }
    // if (horaSimulada > toleranciaEntrada && horaSimulada < horaDeSalida) {
    //   console.log("es su hora de entrada")
    // }
    // else {
    //   console.log("no es su hora de entrada")
    // }

    // console.log(horaSimulada)
    console.log("hora tolerancia " + toleranciaEntrada + " hora de salida " + horaDeSalida)
    return hoy > toleranciaEntrada && hoy < horaDeSalida;


  }
  verificaDia(inscripcion: Inscripcion[]): boolean {
    const hoy = new Date();
    const numeroDia = hoy.getDay();
    const tienePermiso = inscripcion.some(x => x.dia == numeroDia)
    console.log("es el dia de su calse " + tienePermiso);
    return tienePermiso;
  }
}
