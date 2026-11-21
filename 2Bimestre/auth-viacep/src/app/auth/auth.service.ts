import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';

// API pública de teste: aceita o usuário "emilys" com a senha "emilyspass"
export const API = 'https://dummyjson.com';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // 1. O token fica num signal e no localStorage (para sobreviver ao F5)
  readonly token = signal<string | null>(localStorage.getItem('token'));
  readonly logado = computed(() => this.token() !== null);

  // 2. Login: manda usuário e senha, recebe o token e guarda
  entrar(username: string, password: string) {
    return this.http
      .post<{ accessToken: string }>(`${API}/auth/login`, { username, password })
      .pipe(
        tap((resposta) => {
          localStorage.setItem('token', resposta.accessToken);
          this.token.set(resposta.accessToken);
        }),
      );
  }

  // 3. Logout: basta esquecer o token
  sair() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}
