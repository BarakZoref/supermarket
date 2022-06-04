import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICategory from '../models/icategory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: ICategory[];
  constructor(
    public _http: HttpClient
  ) { }


  public getAllCategories(): void {
    this._http.get<ICategory[]>('http://localhost:3001/categories')
      .subscribe((categories) => {
        this.categories = categories
        console.log("categories: ", this.categories);
      },
        err => {
          console.log(err);
          alert("cannot get categories");
        })
  }
}
