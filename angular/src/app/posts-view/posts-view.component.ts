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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data;
      // console.log(this.posts.length)
      for (let i = 0; i < this.posts.length; i++) {
        this.apiService.getSongByID(this.posts[i].songId).subscribe((data) => {
          this.postSongs.push({
            key: this.posts[i],
            value: data
          });
          console.log(this.postSongs[i].value);
        });
      }
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
