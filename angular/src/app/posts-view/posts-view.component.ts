import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.css']
})
export class PostsViewComponent implements OnInit {

  posts;
  users;

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    await this.getPostsPromise();
    await this.getUsersPromise();
    console.log("pubsubrubbadubdub");
    console.log(this.posts);
    console.log("shit");
    console.log(this.users);
    console.log("fuck");
  }

  async getPostsPromise() {
    return new Promise((resolve,reject) => this.apiService.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data;
    }));
  }

  async getUsersPromise() {
    return new Promise((resolve,reject) => this.apiService.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    }));
  }
}
