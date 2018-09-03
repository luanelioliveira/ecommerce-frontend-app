
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../models/login.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { LocalUser } from '../../models/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) {

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

    successfulLogin(authorizationValue : string) {
        let t = authorizationValue.substring(7);
        let user : LocalUser = {
            token: t
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null); 
    }

}