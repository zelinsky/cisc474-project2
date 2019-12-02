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
  showForm = false;
  formButtonText = 'Make a Post';
  textFormDisplay = true;
  formType = 'Text';
  selectedFile: File;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getSongByID(params.get('songID'));
      this.getPostsBySongID(params.get('songID'));
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    this.api.postPost(this.song._id, uploadData).subscribe(data => {
      console.log(data);
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.formButtonText = 'X';
    } else {
      this.formButtonText = 'Make a Post';
    }
  }

  toggleFormType() {
    this.textFormDisplay = !this.textFormDisplay;
    if (this.textFormDisplay) {
      this.formType = 'Text';
    } else {
      this.formType = 'Image';
    }
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

  newTextPost(form: any) {
    // this.apiService.postSong(form.value);
    if (form.form.status === 'VALID') {
      this.api.postPost(this.song._id, form.value).subscribe(data => {
        console.log(data);
      });
    }
  }
}
