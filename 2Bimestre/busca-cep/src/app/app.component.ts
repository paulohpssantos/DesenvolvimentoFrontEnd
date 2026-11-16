import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Endereco, ViaCepService } from './services/viacep.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected endereco = signal<Endereco | null>(null);
  protected cep = signal('');
  protected erro = signal<string | null>(null);
  protected carregando = signal(false);
  
  //Limita a 8 digitos o campo e busca sozinho quando o CEP estiver completo
  aoDigitar(evento: Event){
    const digitos = (evento.target as 
      HTMLInputElement).value.replace(/\D/g, '').slice(0,8);
      this.cep.set(digitos);
      if(digitos.length === 0) this.buscar();
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
    
  }

}
