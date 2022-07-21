import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import IUser from 'src/app/models/iuser.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private usersSubscription: Subscription;
  currentUser: IUser;

  constructor(
    private _usersService: UsersService,
    private _productsService: ProductsService,
    private _categoriesService: CategoriesService,
    public router: Router,
    public _stateService: StateService
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
    this.router.navigate(['/start-screen/login']);
  }

  onSearchChanged(input): void{
    this._productsService.getProductsBySearchInput(input);
    this._categoriesService.selectedCategory = 0;
  }

}
