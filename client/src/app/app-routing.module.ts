import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeforeShoppingComponent } from './components/before-shopping/before-shopping.component';
import { DocComponent } from './components/doc/doc.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterStepOneComponent } from './components/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register-step-two/register-step-two.component';
import { RegisterComponent } from './components/register/register.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { StoreComponent } from './components/store/store.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeRedirectionGuard } from './guards/home-redirection.guard';
import { LoginGuard } from './guards/login.guard';
import { OrderGuard } from './guards/order.guard';

const routes: Routes = [

  {
    path: 'start-screen',
    component: StartScreenComponent,
    children: [
      {path: 'login', canActivate: [HomeRedirectionGuard], component: LoginComponent},
      {path: 'register', canActivate: [HomeRedirectionGuard], component: RegisterComponent,
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
  { path: 'order', canActivate: [OrderGuard], component: OrderComponent},
  { path: 'doc', canActivate: [LoginGuard, AdminGuard], component: DocComponent},
  { path: "", redirectTo: "/start-screen/login", pathMatch: "full" },
  { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
