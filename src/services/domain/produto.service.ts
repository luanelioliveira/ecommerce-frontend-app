import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { Observable } from 'rxjs/Rx';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){

    }

    findByCategoria(categoriaId : string) : Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/products/search?categories=${categoriaId}`);
    }

}