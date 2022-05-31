import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProductAddDetails from '../models/iproduct-add-details.model';
import IProductEditDetails from '../models/iproduct-edit-details.model';
import IProduct from '../models/iproduct-model';
import IServerResponse from '../models/iserver-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: IProduct[] = [];
  amountOfProducts: number;
  private baseUrl: string = "http://localhost:3001/products/"
  constructor(
    public _http: HttpClient
  ) { }

  public getAllProducts(): void {
    this._http.get<IProduct[]>(this.baseUrl)
      .subscribe((products) => {
        this.products = products
        console.log(this.products)
      },
        err => {
          console.log(err);
          alert("Cannot get products")
        })
  }

  public getAmountOfProducts(): void {
    this._http.get<any>(this.baseUrl + 'amount_of_products')
      .subscribe((serverResponse) => {
        this.amountOfProducts = serverResponse[0].amountOfProducts;
        console.log(this.amountOfProducts)
      },
        err => {
          console.log(err);
          alert("Cannot get products")
        })
  }
  public getProductsByCategoryId(categoryId: number): void{
    this._http.get<IProduct[]>(this.baseUrl+categoryId)
    .subscribe((products) => {
      this.products = products
      console.log(this.products)
    },
      err => {
        console.log(err);
        alert("Cannot get products")
      })
  }

  public editProductPrice(productDetails: IProductEditDetails): void{
    this._http.put<IServerResponse>(this.baseUrl, productDetails)
    .subscribe((serverResponse) => {
      console.log(serverResponse.msg);
    },
      err => {
        console.log(err);
        alert("Cannot get products")
      })
  }

  public addProduct(productDetails: IProductAddDetails): void{
    this._http.post<IServerResponse>(this.baseUrl, productDetails)
    .subscribe((serverResponse) => {
      console.log(serverResponse.msg);
    },
      err => {
        console.log(err);
        alert("Cannot get products")
      })
  }
}
