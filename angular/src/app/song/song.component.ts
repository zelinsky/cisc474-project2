import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {AuthComponent} from '../auth/auth.component';
class ImageSnippet {

  pending = false;

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  song;
  posts;
  post;
  showForm = false;
  formButtonText = 'Make a Post';
  textFormDisplay = true;
  formType = 'Text';
  status = 'init';
  buttonStyle = 'btn-success';

  selectedFile: ImageSnippet;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getSongByID(params.get('songID'));
      this.getPostsBySongID(params.get('songID'));
    });
  }

  private onSuccess() {
    this.status = 'ok';
    this.toggleForm();
    this.ngOnInit();
  }

  private onError() {
    this.status = 'fail';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    if (file) {
    reader.readAsDataURL(file);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.formButtonText = 'x';
      this.buttonStyle = 'btn-danger';
      this.status = 'init';
    } else {
      this.formButtonText = 'Make a Post';
      this.buttonStyle = 'btn-success';
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
      this.api.postPost(this.song._id, form.value).subscribe((data) => {
        this.onSuccess();
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.status = 'notLoggedIn';
        }
      }
      );
    }
  }

  getPostByID(postId: string) {
    this.api.getPostByID(postId).subscribe((data) => {
      console.log(data);
      this.post = data;
    });
  }


 // deletePost(post) {
  deletePost(postID: string) {
      console.log("AHAHA");
      this.api.deletePost(postID).subscribe((data) => {
        this.onSuccess();
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.status = 'notLoggedIn';
        }
      }
      );
  }

  newImagePost(form: any) {
    // this.apiService.postSong(form.value);

    if (form.form.status === 'VALID' && !this.selectedFile) {
      alert('Please select an image');
    }
    if (form.form.status === 'VALID' && this.selectedFile) {

      const formData = new FormData();
      formData.append('image', this.selectedFile.file, this.selectedFile.file.name);
      formData.append('title', form.value.title);

      this.api.postPost(this.song._id, formData).subscribe(
        (res) => {
          this.selectedFile.pending = false;
          this.selectedFile.src = '';
          this.selectedFile = null;
          this.onSuccess();
        },
        (err) => {
          this.selectedFile.pending = false;
          this.selectedFile.src = '';
          this.selectedFile = null;
          this.onError();
        });
    }
  }
}
