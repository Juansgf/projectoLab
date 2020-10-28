import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
//import { profile } from 'console';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = {name:null};
  email:any = {email:null};
  descripcion:any = {desc:null};
  trabajo2:any = {trabajo:null};
  id:any = {_id:null};

  editProfile = false;


  nombre:String;
  descr:String;
  work:String;
  facebook:String;
  twt: String;


  constructor(private authService: AuthService, private flashMessage: FlashMessagesService, private router: Router) { }

  updateProf(){
    const user = {
      name: this.nombre,
      desc: this.descr,
      trabajo: this.work,
      face: this.facebook,
      twt: this.twt
    }
    

    this.authService.updateUser(user,this.id).subscribe(data =>{
      //console.log("Entre a la funcion", data.body)
      console.log(data)
      if (data.body['success']){
        this.flashMessage.show('Usuario actualizado!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }else{
        this.flashMessage.show('Usuario actualizado', {cssClass: 'alert-success', timeout: 3000});
        this.edHProfile();
        window.location.reload();
      }
    })
  }

  edProfile() {
    this.editProfile = true; // Show new blog form
  }

  edHProfile() {
    this.editProfile = false; // Show new blog form
  }

  ngOnInit(): void {
    this.authService.authenticatePorfile().subscribe(profile =>{
      this.user = profile.body.user;
      this.email = profile.body.email;
      this.descripcion = profile.body.desc;
      this.trabajo2 = profile.body.trabajo;
      this.id = profile.body.user._id;
      console.log(this.id)
    })
  }

}
