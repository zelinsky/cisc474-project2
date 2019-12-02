import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts : Array<any>;
  // postsArray : Array<[string,any]>;
  songs : Array<any>;
  users : Array<any>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.getPostsArray();
    this.getPosts();
    this.getSongs();
    // this.getUsers();
    // console.log(this.getUsernameByID("5dd83005eb8d8530605a33c5"));
    // console.log("shits and gigs");
    // console.log(this.posts);
  }

  getSongByID(songID: string) {
    this.api.getSongByID(songID).subscribe((data) => {
      return data;
    });
  }
  getUserByID(userID: string) {
    this.api.getUserByID(userID).subscribe((data) => {
      console.log(data);
      this.users.push(data);
    });
  }
  // getUsers() {
  //   this.api.getUsers().subscribe((data) => {
  //     console.log(data);
  //     this.users = data as Array<any>;
  //   });
  // }
  // getPostsArray() {
  //   this.api.getPosts().subscribe((data) => {
  //     console.log(data);
  //     this.posts = data as Array<any>;
  //     for (let i = 0; i < this.posts.length; i++) {
  //       console.log(this.posts[i]);
  //       let curUsername = this.getUsernameByID(this.posts[i].userId);
  //       this.postsArray[i] = [curUsername,this.posts[i]];
  //     }
  //   });
  // }
  getPosts() {
    this.api.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data as Array<any>;
      for (let i = 0; i < this.posts.length; i++) {
        this.getUserByID(this.posts[i].userId);
      }
    });
  }
  getSongs() {
    this.api.getSongs().subscribe((data) => {
      console.log(data);
      this.songs = data as Array<any>;
    });
  }

}
