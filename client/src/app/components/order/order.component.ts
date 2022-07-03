import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IUser from 'src/app/models/iuser-model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderUserData: any = { city: "", street: "", shippingDate: "", creditCardNumber: "" };
  userOrderForm: UntypedFormGroup;
  cities: string[];

  invalidDates: Array<Date>;
  minDate: Date;
  displayModal: boolean = false;
  currentUser: IUser;

  constructor(
    public _cartItemsService: CartItemsService,
    public _ordersService: OrdersService,
    public _usersService: UsersService,
    public _cartService: CartService,
    private formBuilder: UntypedFormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    });
    this.userOrderForm = this.formBuilder.group({
      city: [this.orderUserData.city, [Validators.required]],
      street: [this.orderUserData.street,[Validators.required, Validators.maxLength(40)]],
      shippingDate: [this.orderUserData.shippingDate,[Validators.required,]],
      creditCardNumber: [this.orderUserData.creditCardNumber,[Validators.required, Validators.pattern("^[0-9\-]+$")]]
    });
    this.userOrderForm.controls.city.setValue(this.currentUser.city);

    this.cities=[
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
    this.minDate = new Date();
    this._ordersService.getBusyDays();
    this.invalidDates = this._ordersService.busyDays;
  }

  order(): void{
    this.orderUserData = this.userOrderForm.value;
    const cartId = this._cartItemsService.cartItems[0].cartId;
    let orderDetailsToBeSent = {
      cartId,
      finalPrice: this._cartItemsService.totalPrice,
      cartItemsArray: this._cartItemsService.cartItems,
      city: this.orderUserData.city,
      street: this.orderUserData.street,
      shippingDate: this.orderUserData.shippingDate,
      paymentLastDigits: this.orderUserData.creditCardNumber.substring(15)
    }

    this._ordersService.addNewOrder(orderDetailsToBeSent);
    this._ordersService.getLastOrderDate();
    this.displayModal = true;
  }

  onHideModal(): void{
    this.router.navigate(['/start-screen/before-shopping']);
    this._cartService.setCurrentCart(null);
  }

  onStreetDoubleClick(): void{
    console.log(this.currentUser.street);

    this.userOrderForm.controls.street.setValue(this.currentUser.street);
  }

  onDownloadReceiptClicked(){
    const cartId = this._cartService.getCurrentCart().id;
    this._ordersService.getReceipt(cartId).subscribe((blob)=>{
      saveAs(blob, cartId + '.txt');
    })
  }

}
