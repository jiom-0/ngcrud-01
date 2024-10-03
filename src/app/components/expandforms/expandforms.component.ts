import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Output, viewChild, ChangeDetectorRef } from '@angular/core';
import { Produto } from '../../main';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../main/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'mainpanel-expandforms',
  templateUrl: 'expandforms.component.html',
  styleUrl: 'expandforms.component.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandformsComponent {

  @Output() parentFunction: EventEmitter<number> = new EventEmitter();

  id?: number;
  nome?: string;
  preco?: number;
  descricao?: string;
  sldAtual?: number;
  isExpandedProduto?: boolean;
  categoria?: string;
  produto: Produto = {};
  error: String = '';

  accordion = viewChild.required(MatAccordion);

  constructor(private auth: AuthService, private cdr: ChangeDetectorRef ){}

  callParentFunction() {
    this.parentFunction.emit(2); 
  }

  confirmarProduto(){
    this.produto = {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      sldAtual: this.sldAtual,
      categoria: this.categoria
    }

    if(this.produto.id){
      this.auth.editProduto(this.produto.id, this.produto).subscribe({
        next: response => {
          console.log(this.produto.id);
          this.cdr.detectChanges();
        },
        error: (e) => {
          this.error = e.error;
          this.cdr.detectChanges();
        }
      })
    }else{
      this.auth.addProduto(this.produto).subscribe({
        next: response => {
          this.id = response.id;
          console.log(this.id);
          this.cdr.detectChanges();
        },
        error: (e) => {
          this.error = e.error;
          this.cdr.detectChanges();
        }
      });
    }
  }

  excluirProduto(){
    if(!this.id) return false;
    this.auth.excluirProduto(this.id).subscribe();
    this.limparCampos();
    return true;
  }

  limparCampos(){
    this.id = undefined;
    this.nome = undefined;
    this.descricao = undefined;
    this.preco = undefined;
    this.sldAtual = undefined;
    this.categoria = undefined;
    this.error = '';
  }
}