import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _productsService: ProductsService,
     public _usersService: UsersService,
     public _cartService: CartService
     ) { }

  ngOnInit(): void {
    // this._productsService.getAllProducts();
    // this._productsService.getAmountOfProducts();
    // this._productsService.getProductsByCategoryId(1);

    // let productId = 1;
    // let newProductPrice = 32.9;
    // this._productsService.editProductPrice({id: productId, price: newProductPrice});

    // let productToBeAdded = {name: "blah", categoryId: 1, price: 9.8, imgUrl: "blahUrl"}
    // this._productsService.addProduct(productToBeAdded);

    // let loginDetails = {userName: "barak@gmail.com", password: "123456"};
    // this._usersService.login(loginDetails);

    // let userRegistrationDetails: IUserRegisterData = {id: "000012345", userName: "zach@gmail.com",
    // firstName: "Zach", lastName: "Levi", password: "123456", city: "Haifa", street: "Hatamar"};
    // this._usersService.register(userRegistrationDetails);

    // this._cartService.addCart();
  }

}
