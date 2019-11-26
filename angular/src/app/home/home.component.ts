import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts;

  constructor(private apiService: ApiService) { }



  ngOnInit() {
    this.apiService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

}
