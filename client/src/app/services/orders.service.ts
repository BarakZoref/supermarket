import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import IOrder from '../models/iorder.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  amountOfOrders: number;
  lastOrderDate: Date;
  busyDays: Array<Date> = new Array<Date>();
  private baseUrl: string = "http://localhost:3001/orders/"
  constructor(
    public _http: HttpClient,
    private _messageService: MessageService
  ) { }

  public getAmountOfOrders(): void {
    this._http.get<any>(this.baseUrl + 'amount_of_orders')
      .subscribe((amountOfOrdersAsObject) => {
        this.amountOfOrders = amountOfOrdersAsObject.amountOfOrders;
        console.log("amount of orders: ", this.amountOfOrders);
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'cannot get amount of orders' });
        })
  }

  public addNewOrder(newOrder: IOrder): void {
    this._http.post<any>(this.baseUrl, newOrder)
      .subscribe((orderId) => {
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'cannot add new order' });
        })
  }

  public getBusyDays(): void{
    this._http.get<any>(this.baseUrl + "busy_days")
      .subscribe((busyDays) => {
        for(let busyDayAsString of busyDays){
          let busyDay = new Date(busyDayAsString.shippingDate);
          this.busyDays.push(busyDay);
        }
        console.log("get Busy Days: ", this.busyDays);
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'cannot get busy days' });
        })
  }

  public getLastOrderDate(): void{
    this._http.get<Date>(this.baseUrl)
    .subscribe((lastOrderDate: Date) => {
      console.log("last order date", lastOrderDate);
      this.lastOrderDate = lastOrderDate;
    },
      err => {
        console.log(err);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'cannot get last order date' });
      })
  }

  public getReceipt(cartId){
   return this._http.get(this.baseUrl + 'receipt/' +cartId, {responseType: "blob"});
    // .subscribe((file: any)=>{
    //   console.log(file);
    // },
    // err=>{
    //   console.log(err);
    //   alert("couldn't get receipt");
    // })

   }

}
