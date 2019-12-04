import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {

  song;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  newSong(form: any) {
    if (form.form.status === 'VALID') {
      this.apiService.postSong(form.value).subscribe(data => {
        this.song = data;
        this.router.navigate(['songs', this.song._id]);
      });
    }

  }

}
