import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreComponent } from './components/store/store.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderComponent } from './components/order/order.component';
import { InputTextModule } from "primeng/inputtext";
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';

// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatButtonModule} from '@angular/material/button';
// import {MatIconModule} from '@angular/material/icon'
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatListModule} from '@angular/material/list';
// import { FlexLayoutModule } from '@angular/flex-layout';


// import {RippleModule} from 'primeng/ripple';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StoreComponent,
    LoginComponent,
    StartScreenComponent,
    RegisterComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // MatSidenavModule,
    // MatListModule,
    // FlexLayoutModule,
    // MatIconModule,
    // MatButtonModule,
    // MatToolbarModule,
    InputTextModule,
    ButtonModule,
    CardModule
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
