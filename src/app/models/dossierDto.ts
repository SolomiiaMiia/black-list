import { CorruptorsDto } from "./corruptorsDto";
import { DisproveDossierPageDto } from "./disproveDossierPageDto";
import { DossierStatus, DossierType } from "./enums";
import { FileDto } from "./fileDto";

export class DossierDto {

  constructor() {
    this.photo = null;
    this.dossierFiles = null;
    this.disproveDossier = null;
  }

  public id: number = 0;

  public lastName: string = '';
  public firstName: string = ''
  public thirdName: string = ''
  public position: string = '';
  public placeOfWork: string = '';
  public address: string = '';
  public region: string = '';
  public locality: string = '';
  public date: Date = new Date();
  public status!: DossierStatus;
  public text: string = '';
  public isAnonymous: boolean = false;
  public author: string = ''
  public phone: string = ''
  public email: string = ''
  public type!: DossierType;
  public photo: FileDto | null;
  public dossierFiles: FileDto[] | null;
  public tags: string[] | null = null;
  public relatedDossiers: CorruptorsDto[] | null = null;

  //only for disproving
  public disproveDossier: DisproveDossierPageDto | null;
}
