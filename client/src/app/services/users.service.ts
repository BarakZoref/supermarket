import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IServerResponse from '../models/iserver-response.model';
import ISuccessfulLoginServerResponse from '../models/isuccessfull-login-server-response.model';
import IUserLoginData from '../models/iuser-login-data.model';
import IUser from '../models/iuser-model';
import IUserRegisterData from '../models/iuser-register-data.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient,
    public _cartService: CartService) { }

    private baseUrl: string = "http://localhost:3001/users/"

  currentUser: IUser;
  userRegisterData: IUserRegisterData = {
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    street: ""
  }


  public login(userLoginData: IUserLoginData): void{
    this._http.post<ISuccessfulLoginServerResponse>(this.baseUrl + 'login', userLoginData)
    .subscribe(response => {
      //Success function

      this.currentUser = {
        firstName: response.firstName,
        lastName: response.lastName,
        city: response.city,
        street: response.street,
        token: response.token
      }
      sessionStorage.setItem("userDetails", JSON.stringify(this.currentUser));

      let userDetailsAsString = sessionStorage.getItem("userDetails");
      let userDetails1 = JSON.parse(userDetailsAsString);
      console.log("userDetails1" , userDetails1);

      this._cartService.currentCart = response.cart;
      console.log("login response", response);
      // this.router.navigate(['/vacations']);
    },
      error => {
        console.log(error)
        alert('Login failed');
      }
    )
  }

  public register(registerData: IUserRegisterData): void{
    this._http.post<IServerResponse>(this.baseUrl, registerData)
    .subscribe(response => {
      console.log(response.msg);
    },
      error => {
        console.log(error);
        alert('Register failed');
      }
    )
  }

  public async isUserExist(id: string, userName: string): Promise<boolean>{
    let isExist: boolean;
    let p = this._http.post<boolean>(this.baseUrl + 'is_exist', {id, userName}).toPromise();
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
