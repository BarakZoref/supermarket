import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import IUser from '../models/iuser.model';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public constructor(
    private router: Router,
    private _messageService: MessageService,
    private _usersService: UsersService){
  }

  public canActivate(): boolean{
    let currentUser: IUser;
    this._usersService.followCurrentUser().subscribe((newUser) => {
      currentUser = newUser;
    });

    if(currentUser && currentUser.role == 'admin'){
      return true;
    }
    this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Your are not authorize for this page' });
    this.router.navigate(['/start-screen/before-shopping']);
    return false
  }

}
