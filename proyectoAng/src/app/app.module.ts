import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component'
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from '../app/services/validate.service';


const appRoutes: Routes = [
 //routes
{path:'', component:HomeComponent},
{path:'register', component:RegisterComponent},
{path:'login', component:LoginComponent},
{path:'dashboard', component:DashboardComponent},
{path:'profile', component:ProfileComponent},
{path:'home', component:HomeComponent},
  
];

@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    //FlashMessagesModule
  ],
  
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,

  ],
 
  providers: [ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
