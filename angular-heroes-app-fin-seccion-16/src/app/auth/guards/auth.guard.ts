import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanMatch,
    Route,
    UrlSegment,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {


    constructor(private AuthService: AuthService, private route: Router) { }

    private checkAuthStatus(): boolean | Observable<boolean> {
        return this.AuthService.checkAuth().pipe(
            tap(  isAuthten => console.log( 'Auntenticated:', isAuthten  )),
            tap((isAuthenticated) => {
                if (!isAuthenticated) this.route.navigate(['./auth/login']);
            }),
            
        )
    }


    

    canMatch(
        route: Route,
        segments: UrlSegment[]
    ): boolean | Observable<boolean> {
        //         console.log('canmatch')
        // console.log(route,segments)
       
        return this.checkAuthStatus();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> {
        // console.log('canActivate')
        // console.log(route,state)
        return this.checkAuthStatus();
    }
}
