import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { AddDossierPageDto } from 'src/app/models/addDossierPageDto';
import { DossierDto } from 'src/app/models/dossierDto';
import { DossierType } from '../../models/enums';
import { DossierSmallDto } from '../../models/dossierSmallDto';
import { DisproveDossierPageDto } from '../../models/disproveDossierPageDto';
import { AdminSettingsDto } from '../../models/adminSettingsDto';
import { EditDossierPageDto } from '../../models/editDossierPageDto';

@Injectable({ providedIn: 'root' })
export class APIService {

  constructor(private httpClient: HttpClient,
    protected envService: EnvService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/auth/login`, { username: username, password: password });
  }

  saveSettings(settings: AdminSettingsDto): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/settings`, settings);
  }

  getSettings(): Observable<AdminSettingsDto> {
    return this.httpClient.get<AdminSettingsDto>(`${this.envService.apiUrl}/settings`);
  }

  get(id: number): Observable<DossierDto> {
    return this.httpClient.get<DossierDto>(`${this.envService.apiUrl}/dossier/${id}`);
  }

  addDossier(dto: AddDossierPageDto): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/dossier`, dto);
  }

  editDossier(id: number, dto: EditDossierPageDto, action: 'save' | 'publish' | 'deny'): Observable<any> {
    return this.httpClient.put(`${this.envService.apiUrl}/dossier/${id}/${action}`, dto);
  }

  publishDisproveDossier(id: number, action: 'publish' | 'deny'): Observable<any> {
    return this.httpClient.put(`${this.envService.apiUrl}/dossier/${id}/disprove/${action}`, {});
  }

  deleteDossier(id: number): Observable<any> {
    return this.httpClient.delete(`${this.envService.apiUrl}/dossier/${id}`);
  }

  deleteDisproveDossier(id: number): Observable<any> {
    return this.httpClient.delete(`${this.envService.apiUrl}/dossier/${id}/disprove`);
  }

  disproveDossier(id: number, dto: DisproveDossierPageDto): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/dossier/${id}/disprove`, dto);
  }

  getLatestDossiers(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.envService.apiUrl}/dossier`);
  }

  search(searchText: string, dossierType: DossierType): Observable<DossierSmallDto[]> {
    //limit results for 20 max
    let params = new HttpParams().set('searchText', searchText)
      .set('dossierType', dossierType);
    return this.httpClient.get<DossierSmallDto[]>(`${this.envService.apiUrl}/dossier`, { params: params });
  }

  feed(take: number): Observable<DossierDto[]> {
    let params = new HttpParams().set('take', take);
    return this.httpClient.get<DossierDto[]>(`${this.envService.apiUrl}/dossier/feed`, { params: params });
  }

}
