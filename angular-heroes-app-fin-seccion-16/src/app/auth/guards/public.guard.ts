import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, UrlSegment,Route, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class publicGuard implements CanMatch,CanActivate {



    constructor(private AuthService:AuthService,
        private route:Router) { }

private authCheckLog(): boolean  | Observable<boolean>{
return  this.AuthService.checkAuth().pipe(
    tap( isAuth => console.log('isAuthnticated',isAuth)),
    tap((isAuth) =>{
if(isAuth) this.route.navigate(['./'])
    }),
    map( isAuth => !isAuth)

)


}


    canMatch(route: Route, segments: UrlSegment[]): boolean  | Observable<boolean>  {
      

        return this.authCheckLog();
    }




    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        
        return this.authCheckLog();
    }
    




    
    
}