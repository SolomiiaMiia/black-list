import { Injectable } from '@angular/core';
import { Observable, of, Subscription, tap } from 'rxjs';
import { AdminSettingsDto } from '../../models/adminSettingsDto';
import { APIService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService: APIService) {

  }

  hasAccess(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    if (currentUser !== null && currentUser.role === 'admin') return true;
    return false;
  }

  grantAccess(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  saveSettings(settings: AdminSettingsDto): void {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  getSettings(): AdminSettingsDto {

    return JSON.parse(localStorage.getItem('settings')!) as AdminSettingsDto;
   
  }

  loadSettings(): Subscription {

    
    let sub =  this.apiService.getSettings().subscribe(res => {

      this.saveSettings(res);

    }, err => {

      let sett = new AdminSettingsDto();
      sett.videoLink = "video link";
      sett.newDossierText = "some text";
      sett.disproveDossierText = "some text2";

      this.saveSettings(sett);

    });

    return sub;
    
  }

}
