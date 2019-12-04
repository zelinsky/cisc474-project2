import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.css']
})
export class PostsViewComponent implements OnInit {

  posts;
  postSongs = [];
  postUsers = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  getSongByPost(post) {
    for (const entry of this.postSongs) {
      if (entry.key === post) {
        return entry.value;
      }
    }
  }
}
