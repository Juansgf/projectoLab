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
  id:any = {_id:null};
  truePost = false;
  icon:any;

  constructor(
    private showPostService: ShowPostService,
    private http: HttpClient,
    private authService: AuthService,
    private router:Router,
    private iconService:IconService) {

  }


  ngOnInit(){
    this.getAllPost();
    // this.getIcon();
  }

  getAllPost(){
    this.showPostService.getAllPost().subscribe(result => {
      this.posts = result['post'];
      // console.log(result)
      console.log("TODOS LOS POSTS",this.posts)
    this.authService.authenticatePorfile().subscribe(profile => {
      this.id = profile.body.user._id

      const diffPost = this.posts.map(person => person.createdBy == this.id);
      console.log(diffPost)

      for(var i = 0; i < diffPost.length; i++){
        if(diffPost[i] = true){

        }
      }
    })
    });

      // for(var i = 0; i < this.posts.length; i++){
      //   console.log("en el for")
      //   this.getIconPosts(this.posts[i].iconBy);
      // }

  }



  likePost(post){
    console.log("likes", post);
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

  // getIconPosts(iconPostUrl){
  //   this.iconService.getIconPosts(iconPostUrl).subscribe(result => {
  //     // console.log(result)
  //     // this.icon = result;
  //     console.log("resultado posts api", result['sprites']['front_default']);
  //     this.icon = result['sprites']['front_default'];
  //   });
  // }
}
