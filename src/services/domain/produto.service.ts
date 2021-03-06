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

    getImageFromBucket(id: string) : Observable<any> {
        let url = this.getUrlSmallImage(id);        
        return this.http.get(url, {responseType: 'blob'});
    }

    getUrlImage(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    }

    findById(categoriaId : string) : Observable<ProdutoDTO> {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/products/${categoriaId}`);
    }

    findByCategoria(categoriaId: string, page: number = 0, linesPerPage: number = 24) : Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(
            `${API_CONFIG.baseUrl}/products/search?categories=${categoriaId}&page=${page}&linesPerPage=${linesPerPage}`);
    }

}