import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "../services/admin.service";
import { NotifyService } from "./notify.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
    private adminService: AdminService,
    private notifyService: NotifyService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.adminService.hasAccess()) return true;
    else {
      this.notifyService.info('У доступі відмовлено, спочатку увійдіть');
      this.router.navigate(['admin/login']);
      return false;
    }

  }

}
