import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //Calcular troco
  valorPago = 0;
  precoProduto = 0;

  calcularTroco(): number {
    const troco = this.valorPago - this.precoProduto;
    return troco;
  }

  //calcular preço por quilo
  precoQuilo = 0;
  quantidadeQuilos = 0;

  calcularValorFinal():number{
    return this.precoQuilo * this.quantidadeQuilos;
  }


}
