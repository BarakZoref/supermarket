import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(
    public _productsService: ProductsService,
    public _ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._productsService.getAmountOfProducts();
    this._ordersService.getAmountOfOrders();
  }

}
