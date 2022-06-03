import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loaderService: LoaderService,
    private adminService: AdminService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.adminService.hasAccess()) {
      req = req.clone({
        headers: req.headers.set('Security-Token', this.adminService.getToken())
      });
    }

    if (req.headers.get('bypassloader') == '1') {
      this.loaderService.setLoading(false);
      return next.handle(req);
    }
    else {
      this.totalRequests++;
      this.loaderService.setLoading(true);

      return next.handle(req)
        .pipe(
          finalize(() => {
            this.totalRequests--;

            if (this.totalRequests === 0) this.loaderService.setLoading(false);
          })
        )
    }
  }
}
