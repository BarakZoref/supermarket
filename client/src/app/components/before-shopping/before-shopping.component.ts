import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ICartItem from 'src/app/models/icart-item.model';
import ICart from 'src/app/models/icart.model';
import IUser from 'src/app/models/iuser.model';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';
import { CartItemsService } from '../../services/cart-items.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-before-shopping',
  templateUrl: './before-shopping.component.html',
  styleUrls: ['./before-shopping.component.css']
})
export class BeforeShoppingComponent implements OnInit {
  currentUser: IUser;
  currentCart: ICart;
  cartItems: ICartItem[];
  subscriptions: Subscription[] = [];
  constructor(
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService,
    public _usersService: UsersService,
    private _cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let usersSubscription = this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    });
    let cartItemsSubscription = this._cartItemsService.followCartItems().subscribe(newCartItems =>{
      this.cartItems = newCartItems
    });
    let cartSubscription = this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart
    });
    this.subscriptions.push(usersSubscription, cartItemsSubscription, cartSubscription);
    if(!this.currentCart){
      this._cartService.openCart();
    }
  }

  ngOnDestroy(): void{
    for(let sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  onResumeShoppingButtonClicked(): void{
    this.router.navigate(['/store']);
  }
  onStartShoppingButtonClicked(): void{
    this.router.navigate(['/store']);
  }

  onEditStoreButtonClicked(): void{
    this.router.navigate(['/store']);
  }

}
