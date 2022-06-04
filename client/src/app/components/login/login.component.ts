import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(
    public _usersService: UsersService,
    public _ordersService: OrdersService,
    public _categoriesService: CategoriesService,
    public _cartItemsService: CartItemsService
  ) { }

  ngOnInit(): void {
    this._ordersService.getAmountOfOrders();
  }

  login() {
    let loginDetails = { userName: this.userName, password: this.password }
    this._usersService.login(loginDetails);


  }
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
}
