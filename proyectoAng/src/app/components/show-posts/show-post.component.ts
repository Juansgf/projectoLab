import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IconService } from 'src/app/services/icon.service';
import { ShowPostService } from './show-post.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-list.component.css'],
  providers: [ ShowPostService, IconService ]
})
export class ShowPostComponent implements OnInit {

  public posts : any [];
  // icon:any;

  constructor(private showPostService: ShowPostService, private iconService: IconService) {

  }

  ngOnInit(){
    this.getAllPost();
    // this.getIcon();
  }

  getAllPost(){
    this.showPostService.getAllPost().subscribe(result => {
      this.posts = result['post'];
      //console.log(this.posts)
    });
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
