import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    name:String;
    email:String;
    password:String;

  constructor(private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService: AuthService,
    private router:Router ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }

     // Required Fields
     if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      //console.log('Llena todo')
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      //console.log('Email no valido')
      return false;
    }

    //Registrar Usuario
    this.authService.registerUser(user).subscribe(data =>{
      console.log("Entre al registro");
      if (data.body['success']){
        this.flashMessage.show('Registrado!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login'])
      }else{
        this.flashMessage.show('Algo salio mal :(', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login'])
      }
    })
  }



}
