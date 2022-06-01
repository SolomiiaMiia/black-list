export enum DossierType {
  All = 0,
  New = 1,
  Published = 2,
  Declined = 3
}

export enum DossierStatus {
  New = 0,
  Disproved = 1
}

export class EnumHelper {

  DossierStatus = {};
  constructor() {
    this.setDossierStatus();
  }

  setDossierStatus() {
    let res = {};
    res[DossierStatus.New] = 'Не спростовано';
    res[DossierStatus.Disproved] = 'Спростовано';
    this.DossierStatus = res;
  }
}
