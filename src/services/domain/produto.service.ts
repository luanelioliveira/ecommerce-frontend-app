import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){

    }

    getSmallImageFromBucket(id: string) : Observable<any> {
        let url = this.getUrlSmallImage(id);        
        return this.http.get(url, {responseType: 'blob'});
    }

    getUrlSmallImage(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    }

    findByCategoria(categoriaId : string) : Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/products/search?categories=${categoriaId}`);
    }

}