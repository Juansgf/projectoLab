import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
//import { tokenNotExpired } from 'angular2-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  post:any;

  constructor(private http:HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/register', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(headers);
    return this.http.post('http://localhost:3000/user/authenticate', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  authenticatePorfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    //let headers = new HttpHeaders();
    //let headers = new HttpHeaders({ 'Authorization': this.authToken });
    headers = headers.set('Authorization', this.authToken);
    console.log(this.authToken)
    headers = headers.set('Content-Type', 'application/json');
    console.log(headers.get('Authorization'))
    return this.http.get('http://localhost:3000/user/profile',{
      headers: headers,
      observe: 'response'
    }).pipe(map((res: any) => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', user);
    this.authToken = token;
    this.user = user;
  }



  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  registerPost(post) {
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/newPost', post, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  storePostData(post) {
    localStorage.setItem('post', JSON.stringify(post));
    this.post = post;
  }

  /*getAllPost(){
    return this.http.get('http://localhost:3000/user/allPosts', {});
  }*/


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  
  /*
  loggedIn() {
    return tokenNotExpired('id_token')
  }*/

}
