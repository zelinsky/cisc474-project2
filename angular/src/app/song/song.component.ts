import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  songs;
  song;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getSongs();
    this.getSongByID("5ddb79fee675c1229c3f2093");
  }
  getSongs() {
      this.api.getSongs().subscribe((data) => {
      console.log(data);
      this.songs = data;
    });
  }
  getSongByID(songID: string) {
    this.api.getSongByID(songID).subscribe((data) => {
      console.log(data);
      this.song = data;
    });
  }
}
