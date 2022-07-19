import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IUserLoginData from 'src/app/models/iuser-login-data.model';
import IUser from 'src/app/models/iuser.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: IUserLoginData = { userName: "", password: "" };

  userLoginForm: UntypedFormGroup;

  constructor(
    private router: Router,
    public _usersService: UsersService,
    private formBuilder: UntypedFormBuilder,
    private _cartService: CartService,
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      userName: [this.loginUserData.userName, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [this.loginUserData.password, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    })

  }

  login(): void {
    this.loginUserData = this.userLoginForm.value;
    console.log(this.loginUserData);

    let observable = this._usersService.login(this.loginUserData);
    observable.subscribe(response => {
      let helper = new JwtHelperService();
      let decoded = helper.decodeToken(response.token);
      let newUser: IUser = {
        firstName: response.firstName,
        lastName: response.lastName,
        city: response.city,
        street: response.street,
        token: response.token,
        role: decoded.role
      }
      sessionStorage.setItem("userDetails", JSON.stringify(newUser));
      this._usersService.setCurrentUser(newUser);
      if(newUser.role == 'user'){
        let cartFromServer = response.cart;
        if(cartFromServer && cartFromServer.isOpen){
          this._cartService.setCurrentCart(cartFromServer);
        }
      }
      this._messageService.add({ key: 'appToast', severity: 'success', summary: 'Login Success', detail: 'You logged in successfuly!' });
      this.router.navigate(['/start-screen/before-shopping']);
    },
      error => {
        console.log(error);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Login Failed', detail: 'password is incorrect or user name doesn\'t exists' });
      }
    )
  }
}
