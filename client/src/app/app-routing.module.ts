import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeforeShoppingComponent } from './components/before-shopping/before-shopping.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterStepOneComponent } from './components/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register-step-two/register-step-two.component';
import { RegisterComponent } from './components/register/register.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { StoreComponent } from './components/store/store.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  {
    path: 'start-screen',
    component: StartScreenComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent,
        children: [
          {path: 'step-one', component: RegisterStepOneComponent},
          {path: 'step-two', component: RegisterStepTwoComponent},
          { path: "", redirectTo: "step-one", pathMatch: "full" },
        ]
      },
      {path: 'before-shopping', canActivate: [LoginGuard],  component: BeforeShoppingComponent},
      {path: "", redirectTo: "login", pathMatch: "full" },

    ],
  },
  { path: 'store', canActivate: [LoginGuard], component: StoreComponent },
  {path: 'order', component: OrderComponent},
  { path: "", redirectTo: "/start-screen/login", pathMatch: "full" },
  { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
