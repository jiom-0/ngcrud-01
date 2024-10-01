export * from './login.service';
import { LoginService } from './login.service';
export * from './produto.service';
import { ProdutoService } from './produto.service';
export * from './usuario.service';
import { UsuarioService } from './usuario.service';
export const APIS = [LoginService, ProdutoService, UsuarioService];
