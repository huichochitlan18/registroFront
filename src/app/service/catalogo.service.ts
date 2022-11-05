import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catalogoAfiliacionMedica } from '../interface/catalogo-afiliacionMedica';
import { catalogoDisciplina } from '../interface/catalogo-disciplina';
import { catalogoDisciplinaPlan } from '../interface/catalogo-disciplinaPlan';

@Injectable({
  providedIn: 'root',
})
export class Catalogos {
  private api: string = `${environment.apiBackEnd}/catalogos`;

  constructor(private http: HttpClient) {}

  afiliacionMedica(): Observable<catalogoAfiliacionMedica[]>{
    return this.http.get<catalogoAfiliacionMedica[]>(`${this.api}/afiliacion-medica`);
  }
  disciplina(): Observable<catalogoDisciplina[]>{
    return this.http.get<catalogoDisciplina[]>(`${this.api}/disciplina`);
  }
  plan(diciplina:number): Observable<catalogoDisciplinaPlan[]>{
    return this.http.get<catalogoDisciplinaPlan[]>(`${this.api}/plan/${diciplina}`);
  }
//   codigoPostal(cp:string): Observable<cp[]> {
//     return this.http.get<cp[]>(`${this.baseUrl+cp}`);
//   }
}
