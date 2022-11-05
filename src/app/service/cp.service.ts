import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cp } from '../interface/cp-interface';

@Injectable({
  providedIn: 'root',
})
export class CodigoPostal {
  private apiCP: string = environment.apiCp;

  constructor(private http: HttpClient) {}

  codigoPostal(cp:string): Observable<cp[]> {
    return this.http.get<cp[]>(`${this.apiCP+cp}`);
  }
}
