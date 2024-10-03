import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Configuration } from './configuration';
import { Produto } from './model/produto';
import { UsuarioService } from './api/usuario.service';
import { ProdutoService } from './api/produto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5106/api/login';
  private messageSource = new Subject<string>();
  public message$ = this.messageSource.asObservable();

  constructor(private http: HttpClient, private usuarioService:UsuarioService, private produtoService: ProdutoService ) {}

  login(email: string, passwd: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.apiUrl, { email, passwd }, { headers })
    .pipe(
      tap(response => {
        if(typeof window !== 'undefined' && response && response.token) {
            this.setToken(response.token);
            this.sendMessage(this.isLoggedIn()?'logado':'');
        }
        }),
      catchError((error) => {
        console.error("Erro na requisição:", error); // Log de erro
        return throwError(() => error);
      })
    );
  }  

  sendMessage(message: string) {
    this.messageSource.next(message);
  }

  getProdutos(): Observable<any>{
    this.setHeader();
    return this.produtoService.apiProdutoGet('body');
  }

  editProduto(id: number, produto: Produto): Observable<any>{
    this.setHeader();
    return this.produtoService.apiProdutoIdPut(id,produto);
  }

  excluirProduto(id: number){
    this.setHeader();
    return this.produtoService.apiProdutoIdDelete(id);
  }

  addProduto(produto: Produto): Observable<any>{
    this.setHeader();
    return this.produtoService.apiProdutoPost(produto);
  }

  addProdutoBulk(produtos: Array<Produto>): Observable<any>{
    this.setHeader();
    return this.produtoService.apiProdutoPost(); 
  }

  setHeader(){
    this.produtoService.configuration = new Configuration({
      basePath: 'http://localhost:5106',
      credentials: {
        "Bearer": "Bearer "+this.getToken(),
      }
    });
  }

  logout(): void {
    if(typeof window !== 'undefined'){
      localStorage.removeItem('jwtToken');
    }
    this.sendMessage('logout');
  }

  setToken(token: string): void {
    if(typeof window !== 'undefined'){
      localStorage.setItem('jwtToken', token);
    }
  }

  getToken(): string | null | void {
    if(typeof window !== 'undefined'){
      return localStorage.getItem('jwtToken');
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
