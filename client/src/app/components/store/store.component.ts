import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/models/iuser.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  showCart: boolean = true;
  currentUser: IUser;
  constructor(
    public _usersService: UsersService,
    // public _categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this._usersService.followCurrentUser().subscribe(newUser=>
      this.currentUser = newUser);
    // this._categoriesService.getAllCategories();
  }

}

