import { Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { Endereco, ViaCepService } from '../core/viacep.service';

@Component({
  selector: 'app-busca-cep',
  templateUrl: './busca-cep.html',
  styleUrl: './busca-cep.css',
})
export class BuscaCep {
  private viaCep = inject(ViaCepService);

  // Os três estados da tela + o valor digitado, todos em signals
  protected cep = signal('');
  protected carregando = signal(false);
  protected erro = signal<string | null>(null);
  protected endereco = signal<Endereco | null>(null);

  /** Mantém só os dígitos e busca sozinho quando o CEP fica completo. */
  aoDigitar(evento: Event) {
    const digitos = (evento.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 8);
    this.cep.set(digitos);
    if (digitos.length === 8) this.buscar();
  }

  buscar() {
    if (this.cep().length !== 8) {
      this.erro.set('Digite os 8 números do CEP.');
      return;
    }

    this.carregando.set(true);
    this.erro.set(null);
    this.endereco.set(null);

    this.viaCep
      .buscar(this.cep())
      .pipe(finalize(() => this.carregando.set(false))) // roda no sucesso e no erro
      .subscribe({
        next: (endereco) => this.endereco.set(endereco),
        error: (e: Error) => this.erro.set(e.message),
      });
  }

  limpar() {
    this.cep.set('');
    this.erro.set(null);
    this.endereco.set(null);
  }
}
