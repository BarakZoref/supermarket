import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import ICategory from '../models/icategory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesSubject = new BehaviorSubject<ICategory[]>(null);
  selectedCategory: number = 0;

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) { }


  followCategories(): Observable<ICategory[]> {
    return this.categoriesSubject.asObservable();
  }

  setCategories(newCategories: ICategory[]): void{
    this.categoriesSubject.next(newCategories);
  }


  public getAllCategories(): void {
    this._http.get<ICategory[]>('http://localhost:3001/categories')
      .subscribe((categories) => {
        this.categoriesSubject.next(categories);
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'cannot get categories' });
        })
  }
}
