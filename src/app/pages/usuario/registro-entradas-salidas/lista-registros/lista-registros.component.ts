import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { TablaEntradasSalidas } from 'src/app/interface/tabla-entrada-salidas.interface';
import { EntradasSalidas } from 'src/app/interface/usuario-lista-entradas-salidas.interface';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.scss']
})
export class ListaRegistrosComponent implements OnInit {
  private _usuarioService = inject(UsuarioService)
  
  @ViewChild(MatTable) table!: MatTable<TablaEntradasSalidas>;

  displayedColumns: string[] = [
    'usuario',
    'hora',
    'tipo',
    // 'acciones',
  ];
  registros: EntradasSalidas[] = [];
  constructor() { }

  ngOnInit(): void {
    this.lista();
  }
  lista() {
    this._usuarioService.listaRegistrosEntradasSalidas().subscribe((respuesta) => {
      console.log(respuesta);
      this.registros = respuesta;
    });
  }
}
