import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import IServerResponse from '../models/iserver-response.model';
import ISuccessfulLoginServerResponse from '../models/isuccessfull-login-server-response.model';
import IUserLoginData from '../models/iuser-login-data.model';
import IUser from '../models/iuser.model';
import IUserRegisterData from '../models/iuser-register-data.model';
import { CartService } from './cart.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService{

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService,
    private router: Router,
  ) {
    let userDetails: string = sessionStorage.getItem("userDetails");
    if (userDetails) {
      let user: IUser = JSON.parse(userDetails);
      this.setCurrentUser(user);
    }
  }
  private baseUrl: string = "http://localhost:3001/users/"

  private currentUserSubject = new BehaviorSubject<IUser>(null);

  followCurrentUser(): Observable<IUser> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(newUser: IUser): void {
    this.currentUserSubject.next(newUser);
  }

  // getCurrentUser(): IUser{
  //   return this.currentUserSubject.value;
  // }

  userRegisterData: IUserRegisterData = {
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    street: ""
  }


  public login(userLoginData: IUserLoginData): Observable<ISuccessfulLoginServerResponse> {
    return this._http.post<ISuccessfulLoginServerResponse>(this.baseUrl + 'login', userLoginData);
  }


  public register(): void {
    this._http.post<IServerResponse>(this.baseUrl, this.userRegisterData)
      .subscribe(response => {
        console.log(response.msg);
        sessionStorage.removeItem("registrationDetails");
        this._messageService.add({ key: 'appToast', severity: 'success', summary: 'Registration Success', detail: 'Your Registration has been successfully completed.' });
        this.router.navigate(['']);
      },
        error => {
          console.log(error);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'User already registered.' });
        }
      )
  }

  public async isUserExist(id: string, userName: string): Promise<boolean> {
    let isExist: boolean;
    let p = this._http.post<boolean>(this.baseUrl + 'is_exist', { id, userName }).toPromise();
    await p.then(response => {
      console.log("response", response)
      isExist = response;
    }).catch(error => {
      console.log(error);
      alert('Register failed');
    }
    )
    return isExist;
  }

}
