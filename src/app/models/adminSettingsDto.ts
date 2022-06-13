import { FileDto } from "./fileDto";

export class AdminSettingsDto {

  constructor() {
    this.pictures = null;
  }

  videoLink: string = '';
  newDossierText: string = '';
  disproveDossierText: string = '';
  pictures: FileDto[] | null;
}
