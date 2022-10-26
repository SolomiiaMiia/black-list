import { Injectable } from '@angular/core';
import { IHistoryDataDto } from '../../models/historyDataDto';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private lifetime: number = 2; // in hours

  saveHistory(key: string, data: any,): void {
    var modal = <IHistoryDataDto>{};
    modal.timestamp = new Date().valueOf();
    modal.data = data;
    localStorage.setItem(key, JSON.stringify(modal));
  }

  getHistory(key: string): any {
    let settings = JSON.parse(localStorage.getItem(key)!) as IHistoryDataDto;
    if (settings !== null && (new Date().valueOf() - settings.timestamp) / 1000 / 60/ 60 > this.lifetime) {
      localStorage.removeItem(key);
      return null;
    }
    return settings.data;
  }
}

export interface IHistorySaver {
  getData(): any,
  applyData(): void
}
