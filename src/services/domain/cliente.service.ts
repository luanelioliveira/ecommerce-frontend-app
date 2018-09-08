import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../auth/storage.service';
import { ImageUtilService } from '../util/image.util';

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {

    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clients/${id}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = this.getUrlImage(id);
        return this.http.get(url, { responseType: 'blob' });
    }

    getUrlImage(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    }

    insert(cliente: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients`,
            cliente,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    uploadPicture(picture: string) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}   