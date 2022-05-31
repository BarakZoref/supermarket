import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  private baseUrl: string = "http://localhost:3001/carts/"
  constructor(
    public _http: HttpClient
  ) { }
}
