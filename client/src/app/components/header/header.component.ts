import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IUser from 'src/app/models/iuser-model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    public _usersService: UsersService
     ) { }

  ngOnInit(): void {
    this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    })
  }

  currentUser: IUser;

  onLogOutClicked(): void{
    sessionStorage.removeItem("userDetails");
    this._usersService.setCurrentUser(null);
    this.router.navigate(['/']);
  }

}
