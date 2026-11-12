import { HttpClient, HttpResponse } from "@angular/common/http";
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

    
}