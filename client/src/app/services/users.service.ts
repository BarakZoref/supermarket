import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IServerResponse from '../models/iserver-response.model';
import ISuccessfulLoginServerResponse from '../models/isuccessfull-login-server-response.model';
import IUserLoginData from '../models/iuser-login-data.model';
import IUserRegisterData from '../models/iuser-register-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  firstName: string;
  lastName: string;
  city: string;
  street: string;

  public login(userLoginData: IUserLoginData): void{
    this._http.post<ISuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginData)
    .subscribe(response => {
      //Success function
      sessionStorage.setItem("token", response.token);
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      this.city = response.city;
      this.street = response.street;
      console.log("login response", response);
      // this.router.navigate(['/vacations']);
    },
      error => {
        console.log(error)
        alert('Login failed');
      }
    )
  }
  public register(registerData: IUserRegisterData){
    this._http.post<IServerResponse>("http://localhost:3001/users/", registerData)
    .subscribe(response => {
      console.log(response.msg);
    },
      error => {
        console.log(error);
        alert('Register failed');
      }
    )
  }
}
