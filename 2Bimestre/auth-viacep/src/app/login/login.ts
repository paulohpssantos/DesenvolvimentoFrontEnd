import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  usuario = 'emilys';
  senha = 'emilyspass';
  erro = signal('');
  carregando = signal(false);

  entrar() {
    this.carregando.set(true);
    this.erro.set('');

    this.auth.entrar(this.usuario, this.senha).subscribe({
      next: () => this.router.navigate(['/cep']), // logou: abre a busca de CEP
      error: () => {
        this.erro.set('Usuário ou senha inválidos.');
        this.carregando.set(false);
      },
    });
  }
}
