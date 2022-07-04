import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';
import IUser from 'src/app/models/iuser.model';
import ICart from 'src/app/models/icart.model';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(
    public _productsService: ProductsService,
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService,
    public _cartService: CartService,
    public _usersService: UsersService
  ) { }

  ngOnInit(): void {
    this._productsService.getAmountOfProducts();
    this._ordersService.getAmountOfOrders();
    this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    });
    this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart
    })
  }

  currentUser: IUser;
  currentCart: ICart;

}
