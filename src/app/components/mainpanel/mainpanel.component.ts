import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Produto } from '../../main';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule  } from '@angular/material/icon';
import { AuthService } from '../../main/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { ExpandformsComponent } from '../expandforms/expandforms.component';

@Component({
  selector: 'app-mainpanel',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, ExpandformsComponent, ReactiveFormsModule],
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css'] // Corrigido de styleUrl para styleUrls
})
export class MainpanelComponent {
  arrproduto: Array<Produto>;
  dataSource: Array<Produto>;
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'sldAtual', 'categoria', 'actions'];

  @ViewChild(ExpandformsComponent) expandForms!: ExpandformsComponent;

  constructor(private fb: FormBuilder, private auth: AuthService, private papa: Papa, private cdr: ChangeDetectorRef) {
    this.arrproduto = [];
    this.dataSource = this.arrproduto;

    this.uploadForm = this.fb.group({
      file: [null]
    });
  }

  executeParentFunction(value: number) {
    if(value == 2) this.getProdutos();
  }

  getProdutos(){
    this.auth.getProdutos().subscribe({
      next: response =>{
        this.dataSource = response;
      }
    });
  }
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadForm.patchValue({
        file: file
      });
    }
    this.sendCSV(file);
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.sendCSV(this.selectedFile)
    }
  }

  sendCSV(file: File): void {
    this.papa.parse(file,{
      complete: (result) => {
          console.log(result.data);
      },
      error(error, file) {
          console.log(error);
      },
      skipEmptyLines: true
    });
  }

  triggerButton(){
    (document.getElementById('fileInput') as HTMLInputElement).click();
  }

  edit(element: any){
    this.expandForms.id = element.id;
    this.expandForms.nome = element.nome;
    this.expandForms.descricao = element.descricao;
    this.expandForms.preco = element.preco;
    this.expandForms.sldAtual = element.sldAtual;

    if(!this.expandForms.isExpandedProduto){
      (document.getElementById('panelProdutos') as HTMLInputElement).click()
    };
    document.getElementById('idInput')?.focus();
    this.cdr.detectChanges();
  }

  logOut(){
    this.auth.logout();
  }
}