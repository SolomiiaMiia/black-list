import { Injectable } from '@angular/core';
import { AdminSettingsDto } from '../../models/adminSettingsDto';
import { User } from '../../models/user';
import { APIService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private currentUser: User;

  constructor(private apiService: APIService) {
    this.currentUser = JSON.parse(localStorage.getItem('user')!) as User;
  }

  hasAccess(): boolean {
    if (this.currentUser !== null && (this.currentUser.role === 'admin' || this.currentUser.role === 'superAdmin')) return true;
    return false;
  }

  isSuperAdmin(): boolean {
    if (this.currentUser !== null && this.currentUser.role === 'superAdmin') return true;
    return false;
  }

  getToken(): string {
    return this.currentUser?.token;
  }

  grantAccess(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser = {} as User;
  }

  saveSettings(settings: AdminSettingsDto): void {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  initSettings(): void {
    this.apiService.getSettings(true).subscribe(res => {
      this.saveSettings(res);
    });
  }

  loadSettings(callbackFunction: (args: AdminSettingsDto) => void) {
    let settings = JSON.parse(localStorage.getItem('settings')!) as AdminSettingsDto;
    if (settings !== null) { callbackFunction(settings) }
    else {
      this.apiService.getSettings().subscribe(res => {
        this.saveSettings(res);
        callbackFunction(res);
      });
    } 
  }

}
