import { Injectable } from '@angular/core';
import { CartItemsService } from './cart-items.service';
import { CartService } from './cart.service';
import { CategoriesService } from './categories.service';
import { OrdersService } from './orders.service';
import { ProductsService } from './products.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  cities=[
    'Jerusalem',
    'Tel-Aviv',
    'Haifa',
    'Petah Tikva',
    'Ashdod',
    'Netanya',
    'Rishon LeZiyyon',
    'Bnei Brak',
    'Beersheba',
    'Ramat Gan',
    'Ashqelon'
  ];

  constructor(
    public _ordersService: OrdersService,
    public _usersService: UsersService,
    public _cartService: CartService,
    public _cartItemsService: CartItemsService,
    public _categoriesService: CategoriesService
  ) {
    this._categoriesService.getAllCategories();
    this._usersService.followCurrentUser().subscribe(newUser=>{
      if(newUser && newUser.role=='user'){
        this._cartService.getLastCart();
        this._ordersService.getLastOrderDate()
      }
      else{
        this._cartService.setCurrentCart(null);
        this._ordersService.lastOrderDate = null;
      }
    });


    this._cartService.followCurrentCart().subscribe(newCart=>{
        if(newCart?.isOpen){
          this._cartItemsService.getCartItems(newCart.id);
        }
        else{
          this._cartItemsService.setCartItems(null);
        }
    })
   }
}
