import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import IProductAddDetails from '../models/iproduct-add-details.model';
import IProductEditDetails from '../models/iproduct-edit-details.model';
import IProduct from '../models/iproduct.model';
import IServerResponse from '../models/iserver-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: IProduct[] = [];
  amountOfProducts: number;
  private productSubject = new BehaviorSubject<IProduct>(null);

  private baseUrl: string = "http://localhost:3001/products/"
  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) { }


  followProduct(): Observable<IProduct> {
    return this.productSubject.asObservable();
  }

  setProduct(newProduct: IProduct): void {
    this.productSubject.next(newProduct);
  }

  public getAllProducts(): void {
    this._http.get<IProduct[]>(this.baseUrl)
      .subscribe((products) => {
        this.products = products
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get products' });
        })
  }

  public getAmountOfProducts(): void {
    this._http.get<any>(this.baseUrl + 'amount_of_products')
      .subscribe((serverResponse) => {
        this.amountOfProducts = serverResponse.amountOfProducts;
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get amount of products' });
        })
  }
  public getProductsByCategoryId(categoryId: number): void{
    this._http.get<IProduct[]>(this.baseUrl+categoryId)
    .subscribe((products) => {
      this.products = products
    },
      err => {
        console.log(err);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get products' });
      })
  }

  public editProduct(productDetails: IProductEditDetails): void{
    this._http.put<IServerResponse>(this.baseUrl, productDetails)
    .subscribe((serverResponse) => {
      console.log(serverResponse.msg);
      this._messageService.add({ key: 'appToast', severity: 'success', summary: 'Success', detail: 'The product was edited successfully' });
    },
      err => {
        console.log(err);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot edit product' });
      })
  }

  public addProduct(productDetails: IProductAddDetails): void{
    this._http.post<IServerResponse>(this.baseUrl, productDetails)
    .subscribe((serverResponse) => {
      console.log(serverResponse.msg);
      this._messageService.add({ key: 'appToast', severity: 'success', summary: 'Success', detail: 'The product was added successfully' });
    },
      err => {
        console.log(err);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot add product' });
      })
  }

  public getProductsBySearchInput(input): void {
    this._http.get<IProduct[]>(this.baseUrl)
      .subscribe((products) => {
        this.products = products.filter(product=>product.name.toUpperCase().startsWith(input.toUpperCase()));
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get products' });
        })
  }
}
