import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  API_URL = environment.apiUrl;
  posts;
  songs;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data;
    });
    this.apiService.getSongs().subscribe((data) => {
      console.log(data);
      this.songs = data;
    });
  }

}
