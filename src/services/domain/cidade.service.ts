import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { CidadeDTO } from '../../models/cidade.dto';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient){

    }

    getCidades(estadoId: string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/states/${estadoId}/cities`);
    }

}