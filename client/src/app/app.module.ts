import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreComponent } from './components/store/store.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderComponent } from './components/order/order.component';
import { InputTextModule } from "primeng/inputtext";
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import { RegisterStepOneComponent } from './components/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register-step-two/register-step-two.component';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { BeforeShoppingComponent } from './components/before-shopping/before-shopping.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { AddOrEditCartItemComponent } from './components/add-or-edit-cart-item/add-or-edit-cart-item.component';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import { AddOrEditProductComponent } from './components/add-or-edit-product/add-or-edit-product.component';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import {TabMenuModule} from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StoreComponent,
    LoginComponent,
    StartScreenComponent,
    RegisterComponent,
    OrderComponent,
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    BeforeShoppingComponent,
    CartComponent,
    ProductsComponent,
    AddOrEditCartItemComponent,
    AddOrEditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    StepsModule,
    ToastModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    InputMaskModule,
    MessagesModule,
    TabMenuModule,
    TabViewModule
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }, MessageService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
