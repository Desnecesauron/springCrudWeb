import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtServicesService } from '../services/jwt-services.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtServicesService: JwtServicesService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('jsonUser')) {
      // console.log('Tem algum dado');
      if (this.jwtServicesService.decrypt('jsonUser') != 'failure') {
        // console.log('Tem algo');
        return true;
      }
      // console.log('Dado possivelmente zuado');
    }

    // console.log('Não colou');
    this.router.navigate(['/']);
    return false;
  }
}
