import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <!-- A barra só aparece para quem está logado -->
    @if (auth.logado()) {
      <nav>
        <span class="marca">Busca CEP</span>
        <button (click)="sair()">Sair</button>
      </nav>
    }

    <router-outlet />
  `,
})
export class App {
  protected auth = inject(AuthService);
  private router = inject(Router);

  sair() {
    this.auth.sair();
    this.router.navigate(['/login']);
  }
}
