import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interface/usuario-response.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api: string = `${environment.apiBackEnd}/auth`;
  private _usuario!: Usuario;

  public get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}
  login(correo: string, contrasena: string) {
    const body = { correo, contrasena };
    return this.http.post<any>(`${this.api}/login`, body).pipe(
      tap((respuesta) => {
        if (respuesta.id) {
          localStorage.setItem('token', respuesta.token!);
          this._usuario = {
            id: respuesta.id,
            correo: respuesta.correo,
            contrasena: respuesta.contrasena,
            nombre: respuesta.nombre,
            apellidoPaterno: respuesta.apellidoPaterno,
            apellidoMaterno: respuesta.apellidoMaterno,
            rol: respuesta.rol,
            token: respuesta.token,
          };
        }
      }),
      map((respuesta) => true),
      catchError((error) => of(false))
    );
    // return this.http.post(`${this.api}/login`,body,{ observe: 'response' });
  }
  logout(){
    // localStorage.removeItem('token');
    localStorage.clear();
  }
  validarToken(): Observable<boolean> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token') || ''
    );
    return this.http.get(`${this.api}/status`, { headers }).pipe(
      map((respuesta: any) => {
        if (respuesta.id) {
          localStorage.setItem('token', respuesta.token!);
          this._usuario = {
            id: respuesta.id,
            correo: respuesta.correo,
            contrasena: respuesta.contrasena,
            nombre: respuesta.nombre,
            apellidoPaterno: respuesta.apellidoPaterno,
            apellidoMaterno: respuesta.apellidoMaterno,
            rol: respuesta.rol,
            token: respuesta.token,
          };
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => of(false))
    );

  }
}
