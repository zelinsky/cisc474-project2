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

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPosts();
    this.getSongs();
    this.getUsers();
  }

  getSongByID(songID: string) {
    this.api.getSongByID(songID).subscribe((data) => {
      return data;
    });
  }
  getUserByID(userID: string) {
    this.api.getUserByID(userID).subscribe((data) => {
      console.log(data);
      return data;
    });
  }
  getUsers() {
    this.api.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }
  getPosts() {
    this.api.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data;
    });
  }
  getSongs() {
    this.api.getSongs().subscribe((data) => {
      console.log(data);
      this.songs = data;
    });
  }

}
