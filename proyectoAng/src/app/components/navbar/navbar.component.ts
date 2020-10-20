import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../home/bootstrap.component.min.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService,
    private router:Router,
    private FlashMessages:FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.auth.logout();
    this.FlashMessages.show('Sesión cerrada exitosamente', {cssClass:'alert-success', timeout:3000});
    this.router.navigate(['/home']);
  }

}
