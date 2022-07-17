import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import ICartItem from 'src/app/models/icart-item.model';
import ICart from 'src/app/models/icart.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentCartItem: ICartItem;
  displayModal: boolean = false;
  currentCart: ICart;
  cartsSubscription: Subscription;

  constructor(
    public _cartItemsService: CartItemsService,
    public _cartService: CartService,
    public _messageService: MessageService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.cartsSubscription = this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart;
    })
  }

  ngOnDestroy(): void{
    this.cartsSubscription.unsubscribe();
  }

  deleteCartItem(cartItemId): void{
    this._cartItemsService.deleteCartItem(cartItemId, this.currentCart.id);
  }

  deleteAllCartItems(): void{
    this._cartItemsService.deleteAllCartItems(this.currentCart.id);
  }

  editItemQuantity(cartItem): void{
    this.currentCartItem = cartItem;
    this.displayModal = true;
  }

  onOrderButtonClicked(): void{
    if(this._cartItemsService.cartItems.length){
      this.router.navigate(['/order']);
    }
    else{
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'There are no cart items in the cart' });
    }
  }

}
