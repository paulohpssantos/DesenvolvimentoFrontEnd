import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

/** Formato da resposta de sucesso da ViaCEP (os campos que usamos). */
export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // cidade
  uf: string;
  ddd: string;
}

/** Quando o CEP tem formato válido mas não existe, a ViaCEP responde 200 com { "erro": true }. */
interface CepInexistente {
  erro: boolean | string;
}

export const VIACEP = 'https://viacep.com.br/ws';

@Injectable({ providedIn: 'root' })
export class ViaCepService {
  private http = inject(HttpClient);

  /** Recebe só os 8 dígitos: buscar('01001000') → GET https://viacep.com.br/ws/01001000/json/ */
  buscar(cep: string): Observable<Endereco> {
    return this.http.get<Endereco | CepInexistente>(`${VIACEP}/${cep}/json/`).pipe(
      retry(1), // GET pode ser repetido com segurança

      // O status é 200 mesmo para CEP inexistente: precisamos olhar o corpo.
      map((resposta) => {
        if ('erro' in resposta) throw new Error('CEP não encontrado.');
        return resposta;
      }),

      // Erros de rede ou HTTP viram uma mensagem amigável para a tela.
      catchError((erro: unknown) => {
        if (erro instanceof HttpErrorResponse) {
          const mensagem =
            erro.status === 400
              ? 'CEP inválido.'
              : 'Não foi possível consultar o CEP. Verifique sua conexão.';
          return throwError(() => new Error(mensagem));
        }
        return throwError(() => erro); // o "CEP não encontrado" do map passa direto
      }),
    );
  }
}
