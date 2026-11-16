import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, map, retry, throwError } from "rxjs";

//Formato da resposta do endpoint
export interface Endereco{
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string; //cidade
    uf: string;
    ddd: string;
}

interface CepInexistente{
    erro: boolean | string;
}

@Injectable({ providedIn: 'root'})
export class ViaCepService{
    private http = inject(HttpClient);
    private url = 'https://viacep.com.br/ws';

    buscar(cep: string): Observable<Endereco> {
        // Requisição padrão
        //return this.http.get<[inteface response]>([url]);    

        //Requisição com tratamento de erros
        return this.http.get<Endereco | CepInexistente>(`${this.url}/${cep}/json`).pipe(
            retry(1), //GET pode ser repetido em caso de problema
            
            //verifica a resposta
            map((resposta) => {
                if('erro' in resposta)throw new Error('CEP não encontrado');
                return resposta;
            }),

            //Erros de rede 
            catchError((erro: unknown) => {
                if(erro instanceof HttpErrorResponse){
                    const mensagem = erro.status === 400 ? 
                    'CEP inválido' : 
                    'Não foi possivel consultar o CEP. Verifique sua conexão';

                    return throwError(() => new Error(mensagem));
                }
                return throwError(() => erro);
            }),
        );
    }

    
}