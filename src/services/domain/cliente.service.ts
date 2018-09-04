import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../auth/storage.service';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email: string) : Observable<ClienteDTO> {

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clients/email?value=${email}`,
            {'headers': authHeader});
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = this.getUrlImage(id);
        return this.http.get(url, {responseType: 'blob'});
    }

    getUrlImage(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    }

}