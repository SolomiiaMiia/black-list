import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: NotifyService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request)
      .pipe(
        catchError(error => {

          if (error instanceof HttpErrorResponse) {
            this.notifyService.error(ErrorInterceptor.getErrorMessage(error));
          }

          return throwError(error);
        }),
      );
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
