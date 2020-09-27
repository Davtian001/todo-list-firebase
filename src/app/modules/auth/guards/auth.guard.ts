import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    Router,
    CanLoad,
    UrlSegment,
    Route
} from '@angular/router';
import { CanActivate } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { first, map, tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.isAuthorized(this.router.url);
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.isAuthorized(state.url);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.isAuthorized(state.url)
    }

    private isAuthorized(url: string): Observable<boolean> {
        return iif(() => !!this.authService.currentUser, // case if the request already sent. don't make a request
            of(!!this.authService.currentUser),
            this.authService.authState$
                .pipe(
                    first(), // complete guard
                    tap(() => this.authService.routRedirectUrl = url), // save last blocked route after login
                    map(state => {
                        if (state) {
                            return true;
                        } else {
                            this.router.navigate(['/auth']);
                            return false;
                        }
                    })
                )
        )
    }
}

