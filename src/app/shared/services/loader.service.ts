import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private isLoadingSubject$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoadingSubject$.asObservable().pipe(delay(0));

    setLoading(isLoading: boolean): void {
        this.isLoadingSubject$.next(isLoading);
    }
}
