import { Component, OnInit } from '@angular/core';
import ICart from 'src/app/models/icart.model';
import ICategory from 'src/app/models/icategory.model';
import IProduct from 'src/app/models/iproduct.model';
import IUser from 'src/app/models/iuser.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayModal: boolean = false;
  amountOfProduct: number = 0;
  productToAdd: IProduct;
  amountOfProductError: boolean = false;
  currentUser: IUser;
  categories: ICategory[];

  constructor(
    public _categoriesService: CategoriesService,
    public _productsService: ProductsService,
    public _cartItemsService: CartItemsService,
    public _usersService: UsersService
  ) { }

  ngOnInit(): void {
    this._categoriesService.followCategories().subscribe(categories=>{
      this.categories = categories;
    });
    this._productsService.getAllProducts();
    this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    });
  }

  onSpecificCategoryClicked(categoryId){
    this._productsService.getProductsByCategoryId(categoryId)
  }

  onAllProductsCategoryClicked(){
    this._productsService.getAllProducts();
  }

  onAddToCartClicked(productToAdd){
    this.productToAdd = productToAdd;
    this.displayModal = true;
  }

  onEditProductClicked(product){
    this._productsService.setProduct(product);
  }
}
