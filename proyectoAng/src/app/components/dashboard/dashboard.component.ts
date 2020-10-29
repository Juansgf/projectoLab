import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {ValidateService} from '../../services/validate.service'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  messageClass;
  message;
  title:String
  content:String
  newPost = false;
  loadingPosts=false;
  form;
  processing = true;
  username;
  user:any = {name:null};

  constructor( 
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService: AuthService,
    //private postService: PostService,
    private formBuilder: FormBuilder,
    private router:Router ) {
      this.createNewPostForm();
     }

  createNewPostForm(){
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
      ])],
      content: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  newPostForm() {
    this.newPost = true; // Show new blog form
  }

   // Enable new blog form
   enableFormNewPostForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('content').enable(); // Enable body field
  }

  disableFormNewPostForm() {
    this.form.get('title').disable();
    this.form.get('content').disable();
  }

  draftComment() {

  }

  addPost() {
    this.newPost = true;
    this.processing = true;

    const post = {
      title: this.form.get('title').value,
      content: this.form.get('content').value
      //createdBy : añadir usuario loggeado en este momento
    }

    console.log(post.title);
    console.log(post.content);
    //  Validar post
    if(!this.validateService.validatePost(post)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      //console.log('Email no valido')
      return false;
    }

    //Registrar Post
    this.authService.registerPost(post).subscribe(data =>{
      console.log("Entre a la funcion", data.body)
      if (data.body['success']){
        this.flashMessage.show('¡Publicación registrada!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard'])
        this.disableFormNewPostForm();
      }else{
        this.flashMessage.show('Algo salió mal', {cssClass: 'alert-danger', timeout: 3000});
        this.processing = false;
        this.enableFormNewPostForm();
        this.router.navigate(['/dashboard'])
      }
    })

  }

  reloadPosts() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
      this.authService.authenticatePorfile().subscribe(profile =>{
        this.user = profile.body.user;
      })
  }



   goBack() {
    window.location.reload(); // Clear all variable states
  }


}

// Disable new blog form
