import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Configuration } from './configuration';
import { Produto } from './model/produto';
import { UsuarioService } from './api/usuario.service';
import { ProdutoService } from './api/produto.service';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:5000/api/login';
  private messageSource = new Subject<string>();
  public message$ = this.messageSource.asObservable();

  constructor(private http: HttpClient, private usuarioService: UsuarioService, private produtoService: ProdutoService ) {
    this.produtoService = new ProdutoService(http, environment.apiUrl, new Configuration());
    this.usuarioService = new UsuarioService(http, environment.apiUrl, new Configuration());
  }

  login(email: string, passwd: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.loginUrl, { email, passwd }, { headers })
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
    return this.produtoService.apiProdutoBulkPost(produtos); 
  }

  setHeader(){
    this.produtoService.configuration = new Configuration({
      apiKeys: {"Authorization": "Bearer " + this.getToken()},
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
