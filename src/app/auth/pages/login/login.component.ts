import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormulario: FormGroup = this._formBuilder.group({
    correo: ['cvx@xcv.com', Validators.email],
    contrasena: ['asdfg', Validators.minLength(5)],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginFormulario.value);

    // this._authService.validarToken().subscribe(respuesta=>{
    //   console.log(respuesta);
    // })
    const { correo, contrasena } = this.loginFormulario.value;
    this._authService
      .login(correo, contrasena)
      .pipe(
        catchError(() => {
          return EMPTY;
          // return throwError(()=> new Error('error en la peticion'))
        })
      )
      .subscribe({
        next: (respuesta) => {
          if (respuesta) {
            this._router.navigateByUrl('/')
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
