import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private notificationService: NotifierService) {
  }

  public info(message: string): void {
    this.show(message, 'info');
  }

  public error(message: string): void {
    this.show(message, 'error');
  }

  private show(message: string, style: 'success' | 'info' | 'error' | 'warning'): void {
    this.notificationService.show({
      message: message,
      type: style
    });
  }
}
