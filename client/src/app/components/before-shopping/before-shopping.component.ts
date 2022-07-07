import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ICart from 'src/app/models/icart.model';
import IUser from 'src/app/models/iuser.model';
import { UsersService } from 'src/app/services/users.service';
import { CartItemsService } from '../../services/cart-items.service';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-before-shopping',
  templateUrl: './before-shopping.component.html',
  styleUrls: ['./before-shopping.component.css']
})
export class BeforeShoppingComponent implements OnInit {
  currentUser: IUser;
  currentCart: ICart;
  subscriptions: Subscription[] = [];
  constructor(
    public _cartService: CartService,
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService,
    public _usersService: UsersService,
    public router: Router
  ) { }

  ngOnInit(): void {
   let cartsSubscription = this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart;
    });
    let usersSubscription = this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    })

    this.subscriptions.push(cartsSubscription, usersSubscription);
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
    this._cartService.openCart();
    this.router.navigate(['/store']);
  }

  onEditStoreButtonClicked(): void{
    this.router.navigate(['/store']);
  }

}
