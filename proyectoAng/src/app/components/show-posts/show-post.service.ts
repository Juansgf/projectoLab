import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { IconService } from 'src/app/services/icon.service';

@Injectable()
export class ShowPostService {


  id:any = {_id:null};
  idPost:any = {createdBy:null};
  iconUser:any;


    constructor(
      private http: HttpClient,
      private authService: AuthService,
      private router:Router
      ){

    }

    getAllPost(){
      this.authService.authenticatePorfile().subscribe(profile =>{
        this.id = profile.body.user._id
        this.authService.getUserPost(this.id).subscribe(post =>{
          this.idPost = post.body
          // console.log(this.idPost)
        });

        //if(this.id == this)
      });

      return this.http.post('http://localhost:3000/user/allPosts',{})
    }



    reloadPosts() {
      this.router.navigate(['/dashboard']);
    }


}
