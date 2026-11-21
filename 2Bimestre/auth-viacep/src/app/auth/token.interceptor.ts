import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { API, AuthService } from './auth.service';

// 4. Toda requisição passa por aqui. O token só vai para a NOSSA API (DummyJSON).
//    Para a ViaCEP ele não é enviado: além de ser desnecessário, entregar o token
//    a um site de terceiros é uma falha de segurança, e o cabeçalho Authorization
//    faria o navegador barrar a chamada por CORS.
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  if (!token || !req.url.startsWith(API)) return next(req);

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
