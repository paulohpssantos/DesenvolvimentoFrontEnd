import { Component, inject, signal } from '@angular/core';
import { Endereco, ViaCepService } from './services/viacep.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private viaCep = inject(ViaCepService);

  protected endereco = signal<Endereco | null>(null);
  protected cep = signal('');
  protected erro = signal<string | null>(null);
  protected carregando = signal(false);
  
  //Limita a 8 digitos o campo e busca sozinho quando o CEP estiver completo
  aoDigitar(evento: Event){
    const digitos = (evento.target as 
      HTMLInputElement).value.replace(/\D/g, '').slice(0,8);
      this.cep.set(digitos);
      if(digitos.length === 8) this.buscar();
  }

  buscar(){
    if(this.cep().length !== 8){
      this.erro.set('Digite os 8 números do CEP.');
      return;
    }

    this.carregando.set(true);
    this.erro.set(null);
    this.endereco.set(null);

    //Efetua a requisição com backend
    this.viaCep
      .buscar(this.cep())
      .pipe(finalize(() => this.carregando.set(false)))
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
