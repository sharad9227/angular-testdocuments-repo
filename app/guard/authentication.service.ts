import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {

    cookieValue = {
        'userId': '',
        'isbn': '',
        'token': ''
    };

    constructor(private cookieService: CookieService) { }

    login() {
        this.cookieValue = {
            'userId': '' || this.cookieService.get('userId'),
            'isbn': '' || this.cookieService.get('isbn'),
            'token': '' || this.cookieService.get('jwtToken')
        };
        if (this.cookieValue.userId != '' && this.cookieValue.isbn != '' && this.cookieValue.token != '') {
            localStorage.setItem('JWT-Token', this.cookieValue.token);
            localStorage.setItem('userId', this.cookieValue.userId);
            localStorage.setItem('isbn', this.cookieValue.isbn);
        } else {
            this.logout();
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
