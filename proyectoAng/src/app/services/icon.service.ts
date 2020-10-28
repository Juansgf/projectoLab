import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IconService{

  apiUrl:any;
  // apiUrl = 'https://avatars.dicebear.com/api/gridy/:seed.svg'
  // apiUrl = 'https://ui-avatars.com/api/?name=John+Doe'

  constructor(private http:HttpClient) { }

  getIcon(){
    this.apiUrl = JSON.parse(localStorage.getItem('user'));
    return this.http.get(this.apiUrl.icon, {});
  }
}
