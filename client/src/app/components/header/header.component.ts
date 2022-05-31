import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _productsService: ProductsService) { }

  ngOnInit(): void {
    this._productsService.getAllProducts();
    this._productsService.getAmountOfProducts();
    this._productsService.getProductsByCategoryId(1);

    let productId = 1;
    let newProductPrice = 32.9;
    this._productsService.editProductPrice({id: productId, price: newProductPrice});

    // let productToBeAdded = {name: "blah", categoryId: 1, price: 9.8, imgUrl: "blahUrl"}
    // this._productsService.addProduct(productToBeAdded);

  }

}
