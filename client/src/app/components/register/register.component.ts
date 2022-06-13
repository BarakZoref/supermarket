import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  items: MenuItem[];
  constructor(

  ) { }

  ngOnInit(): void {

    this.items = [{
      label: 'First Stage',
      routerLink: '/start-screen/register/step-one'
    },
    {
      label: 'Second Stage',
      routerLink: '/start-screen/register/step-two'
    },
    ];
  }

}
