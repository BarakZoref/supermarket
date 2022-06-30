import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IUser from 'src/app/models/iuser-model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

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

  // order(): void{
  //   this.orderUserData = this.userOrderForm.value;
  //   let orderDetailsToBeSent = {
  //     cartId: this._cartItemsService.cartItems[0].cartId,
  //     finalPrice: this._cartItemsService.totalPrice,
  //     city: this.orderUserData.city,
  //     street: this.orderUserData.street,
  //     shippingDate: this.orderUserData.shippingDate,
  //     paymentLastDigits: this.orderUserData.creditCardNumber.substring(9)
  //   }

  //   this._ordersService.addNewOrder(orderDetailsToBeSent);
  //   this.displayModal = true;
  // }

  order(): void{
    console.log("new order was added");
  }

  onStreetDoubleClick(): void{
    console.log(this.currentUser.street);

    this.userOrderForm.controls.street.setValue(this.currentUser.street);
  }

}
