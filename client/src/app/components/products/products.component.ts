import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import ICategory from 'src/app/models/icategory.model';
import IProduct from 'src/app/models/iproduct.model';
import IUser from 'src/app/models/iuser.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
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
  private subscriptions: Subscription[] = [];

  constructor(
    public _categoriesService: CategoriesService,
    public _productsService: ProductsService,
    public _cartItemsService: CartItemsService,
    private _usersService: UsersService,
    private _stateService: StateService
  ) { }

  ngOnInit(): void {
    let categoriesSubscription = this._categoriesService.followCategories().subscribe(categories=>{
      if(categories){
        for (const category of categories)
         {
          this.categories.push(category)
        }
      }
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
    this._stateService.searchProductInput = "";
  }
}
