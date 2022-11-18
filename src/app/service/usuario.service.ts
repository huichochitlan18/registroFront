import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cp } from '../interface/cp-interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private backEnd: string = environment.apiBackEnd;

  constructor(private http: HttpClient) {}

  registrar(data:any): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${this.backEnd}/usuarios`,data);
  }
  // descargarDocumento(): Observable<any>{
  //   return this.http.get<any>(`${this.backEnd}/usuarios/documento` {responseType: 'blob'});
  // }
}
