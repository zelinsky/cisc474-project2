import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  song;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getSongByID("5ddb79fee675c1229c3f2093");
  }
  getSongByID(songID: string) {
    this.api.getSongByID(songID).subscribe((data) => {
      console.log(data);
      this.song = data;
    });
  }
}
