import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-the-nav-bar',
  templateUrl: './the-nav-bar.component.html',
  styleUrls: ['./the-nav-bar.component.scss']
})
export class TheNavBarComponent implements OnInit {

  constructor(private adminService: AdminService,
    private router: Router  ) {
    this.isLoggedIn = adminService.hasAccess();
  }

  public isLoggedIn: boolean;

  ngOnInit(): void {
    this.adminService.initSettings();
  }

  logout() {
    this.adminService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

}
