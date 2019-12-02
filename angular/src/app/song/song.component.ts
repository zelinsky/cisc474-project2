import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  song;
  posts;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getSongByID(params.get('songID'))
      this.getPostsBySongID(params.get('songID'))
    });
  }
  getSongByID(songID: string) {
    this.api.getSongByID(songID).subscribe((data) => {
      console.log(data);
      this.song = data;
    });
  }
  getPostsBySongID(songID: string) {
    this.api.getPostsBySongID(songID).subscribe((data) => {
      console.log(data);
      this.posts = data;
    });
  }
}
