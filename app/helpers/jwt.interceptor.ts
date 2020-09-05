import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthGuard } from '../guard/authentication.service';
import { AssessmentListService } from '../shared/services/assessment-list.service';
import { ShareDataService } from '../shared/services/shared.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private auth: AuthGuard,
        private sharedService: AssessmentListService,
        private shareDataService: ShareDataService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const jwtToken = localStorage.getItem('JWT-Token');
        const headers: HttpHeaders = new HttpHeaders();

        if (jwtToken) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            request = request.clone({
                setHeaders: {
                    'Content-Type':  'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                }
            });

        }
        // Share flag status to add spinner
        this.shareDataService.loading = false;
        this.shareDataService.sendSpinnerData(this.shareDataService.loading);
        return next.handle(request).pipe(
            finalize(() => {
                // Share flag status to remove spinner
                this.shareDataService.loading = true;
                this.shareDataService.sendSpinnerData(this.shareDataService.loading);
            })
        );
    }
}
