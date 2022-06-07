import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  searchString: string = '';
  videoLink: SafeResourceUrl | undefined;

  constructor(private router: Router,
    private adminService: AdminService,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.adminService.loadSettings((response) => {
      this.videoLink = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + response.videoLink);
    });
  }


  public create(): void {
    this.router.navigate(['/add-dossier']);

  }

  search(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        searchText: this.searchString
      }
    };
    this.router.navigate(['/search'], navigationExtras);
  }


}
