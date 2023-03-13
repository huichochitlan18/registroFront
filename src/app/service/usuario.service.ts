import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cp } from '../interface/cp-interface';
import { UsuarioInformacion, InformacionContacto, Pago } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private backEnd: string = environment.apiBackEnd;

  constructor(private http: HttpClient) { }

  registrar(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(
      `${this.backEnd}/usuarios/registrar-alumno`,
      data
    );
  }
  listaAlumnos(): Observable<UsuarioInformacion[]> {
    return this.http.get<UsuarioInformacion[]>(`${this.backEnd}/usuarios`);
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
}
