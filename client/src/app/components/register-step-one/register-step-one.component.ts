import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.css']
})
export class RegisterStepOneComponent implements OnInit {

  registerUserConnectionData: any = { id: "", userName: "", password: "", confirmPassword: "" };
  userRegisterForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
      id: [this.registerUserConnectionData.id, [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]+$')]],
      userName: [this.registerUserConnectionData.userName, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [this.registerUserConnectionData.password,  [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      confirmPassword: [this.registerUserConnectionData.confirmPassword],
    })

  }
  submit(): void{
    this.registerUserConnectionData = this.userRegisterForm.value;
    console.log(this.registerUserConnectionData);
    }

}
