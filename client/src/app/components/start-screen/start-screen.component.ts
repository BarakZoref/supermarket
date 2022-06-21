import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(
    public _productsService: ProductsService,
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService
  ) { }

  ngOnInit(): void {
    this._productsService.getAmountOfProducts();
    this._ordersService.getAmountOfOrders();
  }

}
