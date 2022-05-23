import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({ providedIn: 'root' })
export class APIService {
    private endpoint = 'dossier';

    constructor(private httpClient: HttpClient,
                protected envService: EnvService) {
    }


    get(): Observable<string[]>{
      return this.httpClient.get<string[]>(`${this.envService.apiUrl}/${this.endpoint}`);
    }
}
