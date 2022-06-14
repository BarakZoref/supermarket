import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import IUserLoginData from 'src/app/models/iuser-login-data.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: IUserLoginData = {userName: "", password: ""};

  userLoginForm: FormGroup;

  isLoginFail: boolean = false;

  constructor(
    private router: Router,
    public _usersService: UsersService,
    private formBuilder: FormBuilder,
    private _cartService: CartService
    // public _ordersService: OrdersService,
    // public _categoriesService: CategoriesService,
    // public _cartItemsService: CartItemsService
  ) { }

  ngOnInit(): void {
    // this._ordersService.getAmountOfOrders();
    this.userLoginForm =this.formBuilder.group({
      userName: [this.loginUserData.userName, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [this.loginUserData.password, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    })

    combineLatest(this.userLoginForm.get('userName').valueChanges, this.userLoginForm.get('password').valueChanges)
    .subscribe(p=>this.isLoginFail = false);

  }

  login(): void {
    this.loginUserData = this.userLoginForm.value;
    console.log(this.loginUserData);

    let observable = this._usersService.login(this.loginUserData);
    observable.subscribe(response => {
      //Success function

      this._usersService.currentUser = {
        firstName: response.firstName,
        lastName: response.lastName,
        city: response.city,
        street: response.street,
        token: response.token
      }
      sessionStorage.setItem("userDetails", JSON.stringify(this._usersService.currentUser));

      let userDetailsAsString = sessionStorage.getItem("userDetails");
      let userDetails1 = JSON.parse(userDetailsAsString);
      console.log("userDetails1" , userDetails1);

      this._cartService.currentCart = response.cart;
      console.log("login response", response);
      this.router.navigate(['/store']);
      // this.router.navigate(['/vacations']);
    },
      error => {
        console.log(error)
        this.isLoginFail = true;
      }
    )
  }
}



    // let loginDetails = { userName: this.userName, password: this.password }
    // this._usersService.login(loginDetails);

  // addNewOrder() {
  //   let shippingDate = new Date();
  //   this._ordersService.addNewOrder({ cartId: 21, finalPrice: 100, city: "Jerusalem", street: "aluf sade", shippingDate, paymentLastDigits: 1234 })
  // }

  // getBusyDays(){
  //   this._ordersService.getBusyDays();
  // }

  // getLastOrderDate(){
  //   this._ordersService.getLastOrderDate()
  // }

  // getAllCategories(){
  //   this._categoriesService.getAllCategories();
  // }

  // addToCart(){
  //   let newCartItem = {
  //     productId: 6,
  //     quantity: 3,
  //     cartId: 18
  //   }
  //   this._cartItemsService.addToCart(newCartItem);
  // }

  // deleteCartItem(){
  //   this._cartItemsService.deleteCartItem(10);
  // }

  // updateCartItemQuantity(){
  //   let cartItemDetails = {
  //     cartItemId: 6,
  //     quantity: 3
  //   }
  //   this._cartItemsService.updateCartItemQuantity(cartItemDetails);
  // }

  // deleteAllCartItems(){
  //   this._cartItemsService.deleteAllCartItems(18);
  // }

  // getCartItems(){
  //   this._cartItemsService.getCartItems(21);
  // }
