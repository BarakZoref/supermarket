import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  categories: ICategory[] = [{id:0, name: 'All'}]
  subscriptions: Subscription[] = [];

  constructor(
    public _categoriesService: CategoriesService,
    public _productsService: ProductsService,
    public _cartItemsService: CartItemsService,
    public _usersService: UsersService
  ) { }

  ngOnInit(): void {
    let categoriesSubscription = this._categoriesService.followCategories().subscribe(categories=>{
        for (const category of categories) {this.categories.push(category)}
      });
    this._productsService.getAllProducts();
    let usersSubscription = this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    });

    this.subscriptions.push(categoriesSubscription, usersSubscription);
  }

  ngOnDestroy(): void{
    for(let sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  // onSpecificCategoryClicked(categoryId){
  //   this._productsService.getProductsByCategoryId(categoryId)
  // }

  // onAllProductsCategoryClicked(){
  //   this._productsService.getAllProducts();
  // }

  onAddToCartClicked(productToAdd){
    this.productToAdd = productToAdd;
    this.displayModal = true;
  }

  onEditProductClicked(product){
    this._productsService.setProduct(product);
  }


  onSelectedCategoryClicked = (event: any) => {
    let selectedCategoryValue = event.originalEvent.target.innerText;
    let selectedCategory = this.categories.find((category)=> {
      return category.name == selectedCategoryValue
    })
    if(selectedCategory.name =="All"){
      this._productsService.getAllProducts();
    }
    else{
      this._productsService.getProductsByCategoryId(selectedCategory.id)
    }

  }
}
