import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guard/validar-token.guard';


const routes: Routes = [
  // m es la variable de module, se puede llamar como sea, pero como contiene modulos pues por eso se llama module
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule ),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
  // {
  //   path: 'facturacion',
  //   loadChildren: () => import('./facturacion/facturacion.module').then( m => m.FacturacionModule)
  // },
  // {
  //   path: '',
  //   component: LoaderComponent
  // },
  // {
  //   path: '**',
  //   // component: ErrorPageComponent
  //   redirectTo: '404'
  // }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
