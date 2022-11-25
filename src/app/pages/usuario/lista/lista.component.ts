import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { usuarioHorario } from 'src/app/interface/usuario-horario';
import { UsuarioService } from '../../../service/usuario.service';
import { UsuarioInformacion } from '../../../interface/usuario.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<usuarioHorario>;

  displayedColumns: string[] = [
    'nombre',
    // 'disciplina',
    // 'plan',
    // 'acciones',
  ];

  listaUsuarios: UsuarioInformacion[] = [];

  constructor(private _usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.lista();
  }
  lista() {
    this._usuarioService.listaAlumnos().subscribe((respuesta) => {
      this.listaUsuarios = respuesta;
    });
  }
}
