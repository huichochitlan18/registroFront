import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu-interface';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  menu: Menu = [
    {
      title: 'Dashboard',
      icon: 'home',
      link: './dashboard',
      color: '#ff7f0e',
    },
    {
      title: 'Agregar alumno',
      icon: 'add',
      link: './agregar-alumno',
      color: '#ff7f0e',
    },
    {
      title: 'Lista de alumno',
      icon: 'list',
      link: './lista-alumnos',
      color: '#ff7f0e',
    },
    {
      title: 'Lista Entradas-Salidas',
      icon: 'list',
      link: './entradas-salidas',
      color: '#ff7f0e',
    },
    {
      title: 'Registrar entradas',
      icon: 'list',
      link: './entradas',
      color: '#ff7f0e',
    },{
      title: 'Registrar salidas',
      icon: 'list',
      link: './salidas',
      color: '#ff7f0e',
    },
    {
      title: 'Registrar entradas QR',
      icon: 'list',
      link: './entradasQR',
      color: '#ff7f0e',
    }
    ,{
      title: 'Registrar salidas QR',
      icon: 'list',
      link: './salidasQR',
      color: '#ff7f0e',
    },
    // {
    //   title: 'Statistics',
    //   icon: 'bar_chart',
    //   color: '#ff7f0e',
    //   subMenu: [
    //     {
    //       title: 'Sales',
    //       icon: 'money',
    //       link: '/sales',
    //       color: '#ff7f0e'
    //     },
    //     {
    //       title: 'Customers',
    //       icon: 'people',
    //       color: '#ff7f0e',
    //       link: '/customers'
    //     }
    //   ]
    // }
  ];

  constructor(public _authService: AuthService) {}

  ngOnInit(): void {}
}
