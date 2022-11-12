import { Injectable } from '@angular/core';
import { IHistoryDataDto } from '../../models/historyDataDto';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private lifetime: number = 2; // in hours
  public key_AddDossier = 'add-dossier-history';
  public key_AddDisproveDossier = 'add-disprove-dossier-history';

  saveHistory(key: string, data: any,): void {
    var modal = <IHistoryDataDto>{};
    modal.timestamp = new Date().valueOf();
    modal.data = data;
    localStorage.setItem(key, JSON.stringify(modal));
  }

  clearHistory(key: string) {
    localStorage.removeItem(key);
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
