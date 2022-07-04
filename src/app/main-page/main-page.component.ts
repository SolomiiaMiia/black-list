import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileDto } from '../models/fileDto';
import { routingAnimation } from '../shared/animations/routing-animation';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class MainPageComponent implements OnInit {

  searchString: string = '';
  videoLink: SafeResourceUrl | undefined;
  pictures!: FileDto[] | null;

  constructor(private router: Router,
    private adminService: AdminService,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.adminService.loadSettings((response) => {
      this.videoLink = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + response.videoLink);
      this.pictures = response.pictures;
    });
  }


  public create(): void {
    this.router.navigate(['/add-dossier']);

  }
}
