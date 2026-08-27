import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  //Variaveis dos inputs
  n1: number | null = null;
  n2: number | null = null;
  n3: number | null = null;
  
  //Variavéis dos resultados
  mediaAritmetica: number | null = null;
  mediaPonderada: number | null = null;
  somaMedias: number | null = null;
  mediaDasMedias: number | null = null;

  calcularMedias(){
    const num1 = Number(this.n1) ?? 0;
    const num2 = Number(this.n2) ?? 0;
    const num3 = Number(this.n3) ?? 0;

    //calcula a média aritmética
    this.mediaAritmetica = (num1 + num2 +num3) / 3;

    //calcular média ponderada (3,2 e 5)
    this.mediaPonderada = (num1 * 3 + num2 * 2 + num3 * 5) / (3 + 2 + 5);

    //soma das médias
    this.somaMedias = this.mediaAritmetica + this.mediaPonderada;

    //média das médias
    this.mediaDasMedias = (this.mediaAritmetica + this.mediaPonderada) / 2;
    
  }

  limpar(){
    this.n1 = this.n2 = this.n3 = null;
    this.mediaAritmetica = this.mediaPonderada = 
      this.somaMedias = this.mediaDasMedias = null;
  }


}
