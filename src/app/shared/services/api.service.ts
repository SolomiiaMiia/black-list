import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { AddDossierPageDto } from 'src/app/models/addDossierPageDto';

@Injectable({ providedIn: 'root' })
export class APIService {

  constructor(private httpClient: HttpClient,
    protected envService: EnvService) {
  }


  get(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.envService.apiUrl}/dossier`);
  }

  addDossier(dto: AddDossierPageDto): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/dossier`, dto);
  }

  getLatestDossiers(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.envService.apiUrl}/dossier`);
  }

  getDossiers(searchText: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.envService.apiUrl}/dossier/${searchText}`);
  }

}
