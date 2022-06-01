import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { AddDossierPageDto } from 'src/app/models/addDossierPageDto';
import { DossierDto } from 'src/app/models/dossierDto';
import { DossierType } from '../../models/enums';
import { DossierSmallDto } from '../../models/dossierSmallDto';
import { DisproveDossierPageDto } from '../../models/disproveDossierPageDto';

@Injectable({ providedIn: 'root' })
export class APIService {

  constructor(private httpClient: HttpClient,
    protected envService: EnvService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/auth/login`, { username: username, password: password });
  }

  get(id: string): Observable<DossierDto> {
    return this.httpClient.get<DossierDto>(`${this.envService.apiUrl}/dossier/${id}`);
  }

  addDossier(dto: AddDossierPageDto): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/dossier`, dto);
  }

  disproveDossier(dto: DisproveDossierPageDto): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/dossier/disprove`, dto);
  }

  getLatestDossiers(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.envService.apiUrl}/dossier`);
  }

  search(searchText: string, dossierType: DossierType): Observable<DossierSmallDto[]> {
    let params = new HttpParams().set('searchText', searchText)
      .set('dossierType', dossierType);
    return this.httpClient.get<DossierSmallDto[]>(`${this.envService.apiUrl}/dossier`, { params: params });
  }

}
