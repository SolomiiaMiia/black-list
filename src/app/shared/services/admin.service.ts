import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

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
}
