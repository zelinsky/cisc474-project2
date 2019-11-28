import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.css']
})
export class PostsViewComponent implements OnInit {

  posts;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data;
    });
  }

}
