import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;

  constructor(private auth:AuthService,
    private router:Router,
    private FlashMessages:FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

    this.auth.authenticateUser(user).subscribe(data =>{
      if (data.body['success']){
        this.auth.storeUserData((data as any).token, (data as any).user);
        this.FlashMessages.show('Bienvenido!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['../posts'])
      }else{
        this.FlashMessages.show(data.body['msg'], {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login'])
      }
    })
  }

}
