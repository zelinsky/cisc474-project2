import { Component, OnInit, Input } from '@angular/core';

import {UsernameService} from '../auth/username.service';
import * as jwt_decode from 'jwt-decode';

export class Username{
  username: string
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() activeClass = 'active';
  isLoggedIn = false;
  username;
  userId;
  name;
  constructor(private usernameService: UsernameService) { }

  ngOnInit() {
    this.usernameService.change.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) {
        this.username = '';
        this.userId = '';
        this.name = '';
      } else {
        this.username = (jwt_decode(localStorage.getItem('token')) as Username).username;
        this.userId = jwt_decode(localStorage.getItem('token'))._id;
        this.name = jwt_decode(localStorage.getItem('token')).firstName;
      }
    });
  }

}
