import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  constructor() { }

  hasAccess(): boolean {
    return true;
  }
}
