import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  private role: string;

  public constructor(private router: Router){
    // let helper = new JwtHelperService();
    // const token = sessionStorage.getItem("token");
    // if(token){
    //   let decoded = helper.decodeToken(token);
    //   this.role = decoded.role;
    // }

  }

  public canActivate(): boolean{
      let helper = new JwtHelperService();
      let userDetails: string = sessionStorage.getItem("userDetails");
      let currentUser = JSON.parse(userDetails);

      if(currentUser){
        let decoded = helper.decodeToken(currentUser.token);
        this.role = decoded.role;
      }
      if(this.role){
        return true;
      }
      this.router.navigate(['/']);
      console.log("loginGuard");

      return false




    // if(this.role){
    //   return true;
    // }
    // console.log("Can not activate");
    // this.router.navigate(['/']);
    // return false;
  }

}
