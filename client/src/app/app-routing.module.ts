import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { StoreComponent } from './components/store/store.component';
import { LoginUserGuard } from './guards/login-user.guard';

const routes: Routes = [

  {
    path: 'start-screen',
    component: StartScreenComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'store',
    component: StoreComponent
  }

  // { path: "home", component: LoginComponent },
  // { path: "store", canActivate: [LoginUserGuard], component: StoreComponent },
  // { path: "", redirectTo: "/home", pathMatch: "full" }
      // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
