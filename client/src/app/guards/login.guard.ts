import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  private role: string;

  public constructor(private router: Router){
    let helper = new JwtHelperService();
    const token = sessionStorage.getItem("token");
    if(token){
      let decoded = helper.decodeToken(token);
      this.role = decoded.role;
    }

  }

  public canActivate(): boolean{
    if(this.role == "user" || this.role == "admin"){
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
