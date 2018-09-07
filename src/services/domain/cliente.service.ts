import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../auth/storage.service';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = this.getUrlImage(id);
        return this.http.get(url, {responseType: 'blob'});
    }

    getUrlImage(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    }

    insert(cliente : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients`,
            cliente,
            {
                observe : 'response',
                responseType: 'text'
            }
        )
    }

}