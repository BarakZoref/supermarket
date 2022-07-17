import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private role: string;

  public constructor(
    private router: Router,
    private _messageService: MessageService){
  }

  public canActivate(): boolean{
      let helper = new JwtHelperService();
      let userDetails: string = sessionStorage.getItem("userDetails");
      let currentUser = JSON.parse(userDetails);

      if(currentUser){
        let decoded = helper.decodeToken(currentUser.token);
        this.role = decoded.role;
      }
      if(this.role == 'admin'){
        return true;
      }
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Your are not authorize for this page' });
      this.router.navigate(['/start-screen/before-shopping']);
      return false
  }

}
