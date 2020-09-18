import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarHomeComponent } from './components/navbarHome/navbarHome.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component'
import { ProfileComponent } from './components/profile/profile.component';
import { ShowPostComponent } from './components/show-posts/show-post.component';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';


import { ValidateService } from '../app/services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { from } from 'rxjs';


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
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],

  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarHomeComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    ShowPostComponent
  ],

  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
