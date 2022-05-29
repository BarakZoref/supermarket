import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduct from '../models/iproduct-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: IProduct[] = [];
  private baseUrl = "http://localhost:3001/products/"
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
}
