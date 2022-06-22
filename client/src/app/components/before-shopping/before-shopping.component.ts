import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemsService } from '../../services/cart-items.service';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-before-shopping',
  templateUrl: './before-shopping.component.html',
  styleUrls: ['./before-shopping.component.css']
})
export class BeforeShoppingComponent implements OnInit {
  constructor(
    public _cartService: CartService,
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService,
    public router: Router
  ) { }

  ngOnInit(): void {

  }

  onResumeShoppingButtonClicked(): void{
    this.router.navigate(['/store'])
  }
  onStartShoppingButtonClicked(): void{
    this._cartService.openCart();
    this.router.navigate(['/store'])
  }

}
