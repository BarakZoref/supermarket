import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(
    public _usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  login(){
     let loginDetails = {userName: this.userName, password: this.password}
     this._usersService.login(loginDetails);
  }

}
