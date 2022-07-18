import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeRedirectionGuard implements CanActivate {
  public constructor(
    private router: Router
    ){
  }

  public canActivate(): boolean{
      // let helper = new JwtHelperService();
      let userDetails: string = sessionStorage.getItem("userDetails");
      let currentUser = JSON.parse(userDetails);

      if(!currentUser){
        return true;
      }
      this.router.navigate(['/start-screen/before-shopping']);
      return false;
  }

}
