import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts;
  songs;
  users;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getPosts();
    this.getSongs();
    this.getUsers();
  }

  getUsernameByID(userID: string) {
    this.apiService.getUserByID(userID).subscribe((data) => {
      console.log(data);
      let user : any;
      user = data;
      return user.username;
    });
  }
  getUsers() {
    this.apiService.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }
  getPosts() {
    this.apiService.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data;
    });
  }
  getSongs() {
    this.apiService.getSongs().subscribe((data) => {
      console.log(data);
      this.songs = data;
    });
  }

}
