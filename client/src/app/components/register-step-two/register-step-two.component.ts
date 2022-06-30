import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.css']
})
export class RegisterStepTwoComponent implements OnInit {

  registerUserData: any = { city: "", street: "", firstName: "", lastName: "" };
  userRegisterForm: UntypedFormGroup;
  cities: string[];
  displayModal: boolean = false;

  // selectedCity: string;
  constructor(
    private _usersService: UsersService,
    private formBuilder: UntypedFormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
      city: [this.registerUserData.city, [Validators.required]],
      street: [this.registerUserData.street,[Validators.required, Validators.maxLength(40)]],
      firstName: [this.registerUserData.firstName,[Validators.required, Validators.maxLength(12)]],
      lastName: [this.registerUserData.lastName,[Validators.required, Validators.maxLength(12)]]
    })

    this.cities=[
      'Jerusalem',
      'Tel-Aviv',
      'Haifa',
      'Petah Tikva',
      'Ashdod',
      'Netanya',
      'Rishon LeZiyyon',
      'Bnei Brak',
      'Beersheba',
      'Ramat Gan',
      'Ashqelon'
    ]

  }

  register(): void{
    this.registerUserData = this.userRegisterForm.value;

    this._usersService.userRegisterData.city = this.registerUserData.city;
    this._usersService.userRegisterData.street = this.registerUserData.street;
    this._usersService.userRegisterData.firstName = this.registerUserData.firstName;
    this._usersService.userRegisterData.lastName = this.registerUserData.lastName;
    console.log(this._usersService.userRegisterData);

    this._usersService.register();
    this.displayModal = true;
    // this.router.navigate(['']);
  }


  goBackToStepOne(): void{
    this.router.navigate(['/start-screen/register/step-one']);
  }

}
