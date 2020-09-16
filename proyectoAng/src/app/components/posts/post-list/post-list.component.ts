import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from "../post.model"
import { PostsService } from '../posts.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ["./post-list.component.css"]
})

export class PostListComponent implements OnInit, OnDestroy{
  /*posts = [
    {title: "Primer post", content: "Este es el primer contenido"},
    {title: "Segundo post", content: "Este es el segundo contenido"},
    {title: "Tercero post", content: "Este es el tercero contenido"}
  ]*/

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService){}

  ngOnInit(){
    this.posts = this.postsService.getPosts()
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[])=> {
      this.posts = posts
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
