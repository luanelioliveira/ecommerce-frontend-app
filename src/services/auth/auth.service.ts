
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../models/login.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {

    }

    authenticate(login : LoginDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            login, 
            {
                observe: 'response',
                responseType: 'text'
            });
    }

}