import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { usuarioHorario } from 'src/app/interface/usuario-horario';
import { UsuarioService } from '../../../service/usuario.service';
import { UsuarioInformacion } from '../../../interface/usuario.interface';
import { Paginacion } from 'src/app/interface/paginacion.interface';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<usuarioHorario>;

  private _usuarioService = inject(UsuarioService);
  private _formBuilder = inject(FormBuilder);

  qrFormGroup = this._formBuilder.group({
    q: ['', Validators.required]
  });
  alumno!: UsuarioInformacion | undefined;
  numerosDeResultados: number = 50;
  paginacion: Paginacion = { limit: this.numerosDeResultados, offset: 0 };
  displayedColumns: string[] = [
    'nombre',
    'disciplina',
    'plan',
    // 'acciones',
  ];

  listaUsuarios: UsuarioInformacion[] = [];

  constructor() { }

  ngOnInit(): void {
    this.lista();
  }
  onSubmit() {

  }
  lista() {
    this._usuarioService.listaAlumnos(this.paginacion).subscribe((respuesta) => {
      this.listaUsuarios = respuesta;
    });
  }
  //q se usa en abreviatura de query
  search(q: string) {
    if (q.length == 0) {
      this.lista();
    }
    if (q.length > 2) {
      this._usuarioService.search(q).subscribe(respuesta => {
        this.listaUsuarios = respuesta;
      })
    }
  }
}
