import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  displayModal: boolean = false;
  amountOfProduct: number = 0;
  currentProductId: number;

  constructor(
    public _categoriesService: CategoriesService,
    public _productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this._categoriesService.getAllCategories();
    this._productsService.getAllProducts();
  }

  onSpecificCategoryClicked(categoryId){
    this._productsService.getProductsByCategoryId(categoryId)
  }

  onAllProductsCategoryClicked(){
    this._productsService.getAllProducts();
  }

  onAddToCartClicked(productid){
    this.currentProductId = productid;
    this.displayModal = true;
    console.log(this.currentProductId);
  }

  onChooseAmountOfProductClicked(){
    this.displayModal = false;
    //TODO:
    //Add item to cart or update quantity
  }

}
