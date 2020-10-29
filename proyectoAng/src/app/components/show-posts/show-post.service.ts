import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class ShowPostService {

    constructor(
      private http: HttpClient,
      private authService: AuthService,
      private router:Router
      ){
      
    }

    getAllPost(){
      return this.http.post('http://localhost:3000/user/allPosts',{})
    }

   

    reloadPosts() {
      this.router.navigate(['/dashboard']);
    }
  

}
