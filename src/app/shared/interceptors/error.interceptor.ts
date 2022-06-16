import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: NotifyService,
    private router: Router) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request)
      .pipe(
        catchError(error => {

          if (error instanceof HttpErrorResponse) {

            const errorMessage = ErrorInterceptor.getErrorMessage(error);
            

            if (error.status == 404) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: errorMessage,
                }
              };

              this.router.navigate(['404'], navigationExtras);
            }
            else {

              if (error.status == 401 || error.status == 422) this.router.navigate(['admin/login']);

              this.notifyService.error(errorMessage);

            }

          }

          return throwError(error);
        }));
  }

  private static getErrorMessage(error: HttpErrorResponse): string {

    if (error.error) return error.error.Message;

    switch (error.status) {
      case 400:
        return 'Не валідні дані';
      case 401:
        return 'Недостатньо прав для здійснення операції';
      case 404:
        return 'Ресурс не знайдено';
      default:
        return 'Щось пішло не так. Зверніться до системного адміністратора';
    }
  }
}
