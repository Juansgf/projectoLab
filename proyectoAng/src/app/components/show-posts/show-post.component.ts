import { Component, OnInit } from '@angular/core';
import { ShowPostService } from './show-post.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-list.component.css'],
  providers: [ ShowPostService ]
})
export class ShowPostComponent implements OnInit {

  public posts : any [];

  constructor(
    private showPostService: ShowPostService,
    private http: HttpClient,
    private authService: AuthService,
    private router:Router) {
    
  }


  ngOnInit(){
    this.getAllPost();
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

}
