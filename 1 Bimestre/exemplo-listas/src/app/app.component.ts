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
  
  //variavel vinculado ao input
  novoNome: string = '';

  //lista de nomes
  listaNomes: string[] = [];

  //Função para adicionar nomes na lista
  adicionarNome(){
    //Verificar se novoNome não está vazio
    if(this.novoNome.trim()){
        //Adiciona o nome na lista
        this.listaNomes.push(this.novoNome);
        //limpar a variavel do input
        this.novoNome = '';
    }
  }

  //Função para remover nome na lista
  //tem como parametro de entrada o endereço(index)
  //do nome que swerá removido
  removerNome(index: number){
    this.listaNomes.splice(index, 1);
  }

}
