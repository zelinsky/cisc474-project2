import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-songs-view',
  templateUrl: './songs-view.component.html',
  styleUrls: ['./songs-view.component.css']
})
export class SongsViewComponent implements OnInit {

  songs;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getSongs();
  }
  getSongs() {
      this.api.getSongs().subscribe((data) => {
      this.songs = data;
    });
  }
}
