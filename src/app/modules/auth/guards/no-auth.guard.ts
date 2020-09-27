import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { AuthService } from "../services/auth.service";
import { first, map } from "rxjs/operators";

@Injectable()
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    canLoad(route: Route, segments: UrlSegment[]) {
        return this.isUnauthorized(route);
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.isUnauthorized(next);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.isUnauthorized(route);
    }

    private isUnauthorized(route: Route | ActivatedRouteSnapshot) {
        return this.authService.authState$
            .pipe(
                first(), // complete guard
                map(state => {
                    if (state) {
                        const redirectUrl = route.data.guard && route.data.guard.routRedirectUrl;
                        if(redirectUrl) {
                            this.router.navigate([redirectUrl]);
                        }
                        return false;
                    } else {
                        return true;
                    }
                })
            )
    }
}
