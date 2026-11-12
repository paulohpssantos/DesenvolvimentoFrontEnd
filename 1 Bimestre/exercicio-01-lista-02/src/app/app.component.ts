import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { count } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  numeroDigitado: number | null = null; //numero digitado no input
  listaNumeros: number[] = []; //lista de números adicionados

  adicionarNumero(){
    if(this.numeroDigitado === null){
      return; //não faz nada se o input estiver vazio
    }
    this.listaNumeros.push(this.numeroDigitado);
    this.numeroDigitado = null; //limpa o input
  }
  removerNumero(indice: number){
    this.listaNumeros.splice(indice, 1);
  }
  
  calcularSoma(): number{
    let total = 0;
    for(const numero of this.listaNumeros){
      total += numero;
    }
    return total;
  }

  calcularMedia(): number{
    if(this.listaNumeros.length === 0){
      return 0;
    }
    return this.calcularSoma() / this.listaNumeros.length;
  }


}
