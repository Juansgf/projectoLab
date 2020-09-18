import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {ValidateService} from '../../services/validate.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title:String
  content:String
  //blogPost;

  constructor( private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService: AuthService,
    private router:Router ) { }

  addPost() {
    const post = {
      tit: this.title,
      cont: this.content,
    }

    //  Validar post
    if(!this.validateService.validatePost(post)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      //console.log('Email no valido')
      return false;
    }

    //Registrar Post
    this.authService.registerPost(post).subscribe(data =>{
      //console.log("Entre a la funcion", data.body)
      if (data.body['success']){
        //console.log("Entre")
        this.flashMessage.show('Post registrado!', {cssClass: 'alert-success', timeout: 3000});
        //this.getAllPosts()
        this.router.navigate(['/dashboard'])
      }else{
        //console.log("el otro")
        this.flashMessage.show('Algo salio mal :(', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }
    })

  }

  /*getAllPosts(){
    this.authService.getAllPost().subscribe(data => {
      if (data['success']){
        //console.log("Entre")
        this.blogPost = data
        this.getAllPosts()
        this.router.navigate(['/dashboard'])
      }else{
        //console.log("el otro")
        this.flashMessage.show('Algo salio mal :(', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }
    })
  }*/

  ngOnInit(): void {
    //this.getAllPosts();
  }

}
