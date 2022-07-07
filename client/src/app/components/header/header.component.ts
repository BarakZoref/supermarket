import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import IUser from 'src/app/models/iuser.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  productInput: string;
  usersSubscription: Subscription;
  currentUser: IUser;

  constructor(
    public router: Router,
    public _usersService: UsersService,
    public _productsService: ProductsService,
    private _categoriesService: CategoriesService
     ) { }

  ngOnInit(): void {
    this.usersSubscription = this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    })
  }

  ngOnDestroy(): void{
    this.usersSubscription.unsubscribe();
  }


  onLogOutClicked(): void{
    sessionStorage.removeItem("userDetails");
    this._usersService.setCurrentUser(null);
    this.router.navigate(['/']);
  }

  onSearchChanged(input): void{
    this._productsService.getProductsBySearchInput(input);
    this._categoriesService.selectedCategory = 0;
    // this._productsService.products = this._productsService.products.filter((product)=>product.name.startsWith(input))
  }

}
