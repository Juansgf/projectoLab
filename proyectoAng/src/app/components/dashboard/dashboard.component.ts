import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {ValidateService} from '../../services/validate.service'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IconService } from 'src/app/services/icon.service';

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
  role:any = {role:null};
  id:any = {_id:null};
  icon:any;

  constructor( 
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService: AuthService,
    //private postService: PostService,
    private formBuilder: FormBuilder,
    private router:Router,
    private iconService: IconService) {
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
      content: this.form.get('content').value,
      createdBy: this.id
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
        this.role = profile.body.user.role
        this.id = profile.body.user._id
        console.log(this.role)
      });
      this.getIcon();
  }



   goBack() {
    window.location.reload(); // Clear all variable states
  }

  getIcon(){
    this.iconService.getIcon().subscribe(result => {
      this.icon = result['sprites']['front_default'];
    });
  }

}

// Disable new blog form
