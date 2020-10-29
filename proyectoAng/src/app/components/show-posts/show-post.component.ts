import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IconService } from 'src/app/services/icon.service';
import { ShowPostService } from './show-post.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-list.component.css'],
  providers: [ ShowPostService, IconService ]
})
export class ShowPostComponent implements OnInit {

  public posts : any [];
  // icon:any;

  constructor(
    private showPostService: ShowPostService,
    private http: HttpClient,
    private authService: AuthService,
    private router:Router) {
    
  }


  ngOnInit(){
    this.getAllPost();
    // this.getIcon();
  }

  getAllPost(){
    this.showPostService.getAllPost().subscribe(result => {
      this.posts = result['post'];
      console.log("TODOS LOS POSTS",this.posts)
    });
  }

  likePost(post){
    console.log(post);
      this.authService.likePost(post).subscribe(data => {
        this.getAllPost();
    });
    
  }

  dislikePost(post){
    this.authService.dislikePost(post).subscribe(data => {
      this.reloadPosts();
    });
  }

  reloadPosts() {
    this.router.navigate(['/dashboard']);
  }

  // getIcon(){
  //   this.iconService.getIcon().subscribe(result => {
  //     // console.log(result)
  //     // this.icon = result;
  //     console.log("resultado api", result['sprites']['front_default']);
  //     this.icon = result['sprites']['front_default'];
  //   });
  // }
}
