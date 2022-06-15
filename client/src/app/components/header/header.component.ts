import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  }
  onLogOutClicked(): void{
    sessionStorage.removeItem("userDetails");
    this._usersService.currentUser = null;
    this.router.navigate(['/']);
  }

}
