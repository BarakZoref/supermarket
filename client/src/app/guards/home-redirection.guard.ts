import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import IUser from '../models/iuser.model';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class HomeRedirectionGuard implements CanActivate {
  public constructor(
    private router: Router,
    private _usersService: UsersService
    ){
  }

  public canActivate(): boolean{
    let currentUser: IUser;
    this._usersService.followCurrentUser().subscribe((newUser) => {
      currentUser = newUser;
    });

  if(!currentUser){
    return true;
  }
  this.router.navigate(['/start-screen/before-shopping']);
  return false;
  }

}
