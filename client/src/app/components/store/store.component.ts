import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import IUser from 'src/app/models/iuser.model';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  showCart: boolean = true;
  currentUser: IUser;
  private subscription: Subscription;
  constructor(
    private _usersService: UsersService,
    private _stateService: StateService
  ) { }

  ngOnInit(): void {
    this.subscription = this._usersService.followCurrentUser().subscribe(newUser=>
      this.currentUser = newUser);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
    this._stateService.searchProductInput = "";
  }

}

