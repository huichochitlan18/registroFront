import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {}
  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return this._authService.validarToken().pipe(
      tap((respuesta) => {
        console.log(respuesta);
        if (!respuesta) {
          this._router.navigateByUrl('/auth');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    return this._authService.validarToken().pipe(
      tap((respuesta) => {
        console.log(respuesta);
        if (!respuesta) {
          this._router.navigateByUrl('/auth');
        }
      })
    );
  }
}
