import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { AddDossierPageDto } from 'src/app/models/addDossierPageDto';
import { DossierDto } from 'src/app/models/dossierDto';
import { DossierType } from '../../models/enums';
import { DossierSmallDto } from '../../models/dossierSmallDto';
import { DisproveDossierPageDto } from '../../models/disproveDossierPageDto';
import { AdminSettingsDto } from '../../models/adminSettingsDto';
import { EditDossierPageDto } from '../../models/editDossierPageDto';
import { LatestDossiersDto } from 'src/app/models/latestDossiersDto';

@Injectable({ providedIn: 'root' })
export class APIService {

  constructor(private httpClient: HttpClient,
    protected envService: EnvService) {
  }

  //+
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/auth/login`, { username: username, password: password });
  }

  //+
  saveSettings(settings: AdminSettingsDto): Observable<any> {
    return this.httpClient.put(`${this.envService.apiUrl}/settings`, settings);
  }

  //+
  getSettings(bypassLoader: boolean = false): Observable<AdminSettingsDto> {
    const headers = new HttpHeaders({ 'bypassloader': bypassLoader ? '1' : '0' });
    return this.httpClient.get<AdminSettingsDto>(`${this.envService.apiUrl}/settings`, { headers: headers });
  }

  //+
  publishDisproveDossier(id: number, action: 'publish' | 'deny'): Observable<any> {
    return this.httpClient.put(`${this.envService.apiUrl}/dossier/${id}/disprove/${action}`, {});
  }

  //+
  deleteDisproveDossier(id: number): Observable<any> {
    return this.httpClient.delete(`${this.envService.apiUrl}/dossier/${id}/disprove`);
  }

  //+
  addDisproveDossier(id: number, dto: FormData): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/dossier/${id}/disprove`, dto);
  }

  //+
  get(id: number): Observable<DossierDto> {
    return this.httpClient.get<DossierDto>(`${this.envService.apiUrl}/dossier/${id}`);
  }

  //+
  addDossier(dto: FormData): Observable<any> {
    return this.httpClient.post(`${this.envService.apiUrl}/dossier`, dto);
  }

  //+
  editDossier(id: number, dto: EditDossierPageDto, action: 'save' | 'publish' | 'decline'): Observable<any> {
    return this.httpClient.put(`${this.envService.apiUrl}/dossier/${id}?action=${action}`, dto);
  }



  //+
  deleteDossier(id: number): Observable<any> {
    return this.httpClient.delete(`${this.envService.apiUrl}/dossier/${id}`);
  }


  //+
  getLatestDossiers(): Observable<LatestDossiersDto[]> {
    return this.httpClient.get<LatestDossiersDto[]>(`${this.envService.apiUrl}/dossier/latest`);
  }

   //+
  search(searchText: string, dossierType: DossierType): Observable<DossierSmallDto[]> {
    //limit results for 20 max
    let params = new HttpParams().set('searchText', searchText)
      .set('type', dossierType);
    return this.httpClient.get<DossierSmallDto[]>(`${this.envService.apiUrl}/dossier/search`, { params: params });
  }

  //+
  feed(skip: number): Observable<DossierDto[]> {
    let params = new HttpParams().set('skip', skip);
    return this.httpClient.get<DossierDto[]>(`${this.envService.apiUrl}/dossier/feed`, { params: params });
  }

  //+
  downloadFile(url: string): Observable<any> {
    return this.httpClient.get(url, { responseType: 'blob' });
  }

}
