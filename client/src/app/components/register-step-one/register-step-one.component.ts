import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.css']
})
export class RegisterStepOneComponent implements OnInit {

  registerUserConnectionData: any = { id: "", userName: "", password: "", confirmPassword: "" };
  userRegisterForm: UntypedFormGroup;
  isUserNotExist: boolean = true;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private _usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
      id: [this.registerUserConnectionData.id, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+$')]],
      userName: [this.registerUserConnectionData.userName, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [this.registerUserConnectionData.password, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      confirmPassword: [this.registerUserConnectionData.confirmPassword],
      isUserNotExist: [this.isUserNotExist, [Validators.requiredTrue]]
    },
      {
        validator: Validators.compose([this.passwordMatchValidator])
      })

    combineLatest(this.userRegisterForm.get('id').valueChanges, this.userRegisterForm.get('userName').valueChanges)
      .subscribe(p => this.userRegisterForm.get('isUserNotExist').setValue(true));

  }
  async submit() {
    this.registerUserConnectionData = this.userRegisterForm.value;
    let id = this.registerUserConnectionData.id;
    let userName = this.registerUserConnectionData.userName;
    let isExist = await this._usersService.isUserExist(id, userName);
    if (isExist) {
      this.userRegisterForm.get('isUserNotExist').setValue(false)
    }
    else {
      this._usersService.userRegisterData.id = id;
      this._usersService.userRegisterData.userName = userName;
      this._usersService.userRegisterData.password = this.registerUserConnectionData.password;
      sessionStorage.setItem("registrationDetails", JSON.stringify(this._usersService.userRegisterData));
      this.router.navigate(['/start-screen/register/step-two']);
    }
  }

  passwordMatchValidator = (registerForm: AbstractControl): ValidationErrors | null => {
    let passwordControl = registerForm.get('password');
    let password = passwordControl.value;
    let confirmPasswordControl = registerForm.get('confirmPassword');
    let confirmPassword = confirmPasswordControl.value;
    if (password != confirmPassword) {
      return {
        'passwordMatchValidator': true
      };
    }
    return null
  }

}
