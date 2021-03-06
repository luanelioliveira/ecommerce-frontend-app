import { CartService } from './../domain/cart.service';

import { Injectable } from '@angular/core';
import { LoginDTO } from '../../models/login.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { LocalUser } from '../../models/local_user';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public cartService: CartService) {

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

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {}, 
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
        let t = authorizationValue.substring(7);
        let user : LocalUser = {
            token: t,
            email: this.jwtHelper.decodeToken(t).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout() {
        this.storage.setLocalUser(null); 
    }

}