import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  // private role: string;

  public constructor(
    private router: Router,
    private _messageService: MessageService){
  }

  public canActivate(): boolean{
      // let helper = new JwtHelperService();
      let userDetails: string = sessionStorage.getItem("userDetails");
      let currentUser = JSON.parse(userDetails);

      if(currentUser){
        return true;
      }
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Your have to login first' });
      this.router.navigate(['/']);
      return false
  }

}
