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
  cartItems: ICartItem[];
  subscriptions: Subscription[] = [];
  constructor(
    public _cartItemsService: CartItemsService,
    public _cartService: CartService,
    public _messageService: MessageService,
    public router: Router
  ) { }

  ngOnInit(): void {
    let cartsSubscription = this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart;
    });
    let cartItemsSubscription = this._cartItemsService.followCartItems().subscribe(newCartItems=>{
      this.cartItems = newCartItems
    });
    this.subscriptions.push(cartsSubscription, cartItemsSubscription);
  }

  ngOnDestroy(): void{
    for(let sub of this.subscriptions){
      sub.unsubscribe();
    }
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
    if(this.cartItems.length){
      this.router.navigate(['/order']);
    }
    else{
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'There are no cart items in the cart' });
    }
  }

  showConfirm() {
    this._messageService.clear();
    this._messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

onConfirm() {
  this._messageService.clear('c');
  this.deleteAllCartItems();
}

onReject() {
  this._messageService.clear('c');
}

}
