import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';

// 5. Só deixa abrir a página quem tem token; os outros vão para o login
export const logadoGuard: CanActivateFn = () =>
  inject(AuthService).logado() || inject(Router).createUrlTree(['/login']);
