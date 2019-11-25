import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  songs;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getSongs().subscribe((data) => {
      console.log(data);
      this.songs = data;
    });
  }

}
