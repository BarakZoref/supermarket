import { Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartItemsService } from './services/cart-items.service';
import { CartService } from './services/cart.service';
import { OrdersService } from './services/orders.service';
import { StateService } from './services/state.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    ) {}
}
