import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.css']
})
export class RegisterStepTwoComponent implements OnInit {

  private registerUserData: any = { city: "", street: "", firstName: "", lastName: "" };
  userRegisterForm: UntypedFormGroup;
  cities: string[];
  constructor(
    private _usersService: UsersService,
    private _stateService: StateService,
    private formBuilder: UntypedFormBuilder,
    private _messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    let registrationDetailsAsString: string = sessionStorage.getItem("registrationDetails");
    if(registrationDetailsAsString){
      this._usersService.userRegisterData = JSON.parse(registrationDetailsAsString);
    }
    else{
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'first stage must be completed before going to second stage' });
      this.router.navigate(['/start-screen/register/step-one'])
    }

    this.userRegisterForm = this.formBuilder.group({
      city: [this.registerUserData.city, [Validators.required]],
      street: [this.registerUserData.street,[Validators.required, Validators.maxLength(40)]],
      firstName: [this.registerUserData.firstName,[Validators.required, Validators.maxLength(12)]],
      lastName: [this.registerUserData.lastName,[Validators.required, Validators.maxLength(12)]]
    })

    this.cities = this._stateService.cities;

  }

  register(): void{
    this.registerUserData = this.userRegisterForm.value;

    this._usersService.userRegisterData.city = this.registerUserData.city;
    this._usersService.userRegisterData.street = this.registerUserData.street;
    this._usersService.userRegisterData.firstName = this.registerUserData.firstName;
    this._usersService.userRegisterData.lastName = this.registerUserData.lastName;
    this._usersService.register();
  }


  goBackToStepOne(): void{
    this.router.navigate(['/start-screen/register/step-one']);
  }

}
