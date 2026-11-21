# Login com token + busca de CEP

1. O usuário faz **login** na API de testes DummyJSON e recebe um **token**.
2. Logado, ele vai para a tela de **busca de CEP**, que consulta a **ViaCEP**.
3. Sem login, a tela `/cep` não abre: o guard manda para `/login`.

```bash
npm install
npm start      # http://localhost:4200
```

Usuário de teste: **emilys** · senha: **emilyspass** (já vêm preenchidos). Requer Node.js 22.22.3+ e internet.

## Fluxo

```
/login ──(POST /auth/login → token)──► /cep ──(GET viacep.com.br/ws/{cep}/json/)──► endereço
                                         └─ Sair: apaga o token e volta para /login
```

## Arquivos

```
src/app/
├─ login/                   componente da tela de login
│  ├─ login.ts              chama o AuthService e navega para /cep
│  ├─ login.html            formulário (usuário, senha, mensagem de erro)
│  └─ login.css
├─ busca-cep/               componente da tela de busca de CEP
│  ├─ busca-cep.ts
│  ├─ busca-cep.html
│  └─ busca-cep.css
├─ auth/
│  ├─ auth.service.ts       login, sair, token no signal + localStorage
│  ├─ token.interceptor.ts  coloca "Authorization: Bearer" nas chamadas à DummyJSON
│  └─ logado.guard.ts       bloqueia /cep sem token
├─ core/viacep.service.ts   GET na ViaCEP + tratamento de erros
├─ app.ts                   barra com “Sair” (só logado) + <router-outlet />
├─ app.routes.ts            rotas e guard
└─ app.config.ts            provideRouter + provideHttpClient(withInterceptors)
```

## Sobre o interceptor

O interceptor só coloca o token nas requisições para a DummyJSON, nunca na ViaCEP:

```ts
if (!token || !req.url.startsWith(API)) return next(req);
```

Entregar o token a um site de terceiros é falha de segurança, e o cabeçalho `Authorization` ainda faria o navegador bloquear a chamada à ViaCEP por CORS.

Neste projeto nenhuma tela chama uma rota protegida da DummyJSON, então o interceptor fica pronto para quando o app chamar a API de vocês (veja o exercício 2).

## O que testar

1. Abra `http://localhost:4200/cep` sem login → vai para `/login`.
2. Erre a senha → aparece “Usuário ou senha inválidos.”
3. Entre → a tela de CEP abre. Teste `01001000`, `99999999` e sem internet.
4. Aperte F5 → continua logado (token no `localStorage`, veja em DevTools → Application).
5. Clique em **Sair** → a barra some e `/cep` volta a pedir login.

## Exercícios

1. Guarde no `localStorage` os últimos 5 CEPs buscados e mostre como atalhos na tela.
2. Mostre “Olá, Emily” na barra buscando `GET https://dummyjson.com/auth/me`. Confira na aba Network que o interceptor colocou o cabeçalho `Authorization`.
3. No interceptor, quando a DummyJSON responder **401**, chame `sair()` e vá para `/login`.
