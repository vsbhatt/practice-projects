import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                return event;
            }), catchError((err: any) => {
                if (err.status === 0 || err.status === 503) {
                    alert('Something went wrong, Please try again later.');
                }
                return _throw(err);
            }));
    }

}
