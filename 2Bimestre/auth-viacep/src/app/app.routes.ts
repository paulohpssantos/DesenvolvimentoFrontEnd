import { Routes } from '@angular/router';

import { logadoGuard } from './auth/logado.guard';
import { BuscaCep } from './busca-cep/busca-cep';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'cep', pathMatch: 'full' },
  { path: 'login', component: Login },

  // Página protegida: sem token, o guard manda para /login
  { path: 'cep', component: BuscaCep, canActivate: [logadoGuard] },

  { path: '**', redirectTo: 'cep' },
];
