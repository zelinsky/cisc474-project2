import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthComponent} from '../auth/auth.component';

import {UsernameService} from '../auth/username.service';
import * as jwt_decode from 'jwt-decode';

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
  userId;
  isLoggedIn;
  showForm = false;
  formButtonText = 'Make a Post';
  textFormDisplay = true;
  formType = 'Text';
  status = 'init';
  buttonStyle = 'btn-success';
  API_URL = environment.apiUrl;

  selectedFile: ImageSnippet;

  

  constructor(
    private route: ActivatedRoute,
    private usernameService: UsernameService,

    private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getSongByID(params.get('songID'));
      this.getPostsBySongID(params.get('songID'));
    });
    if (localStorage.getItem('token')) {
      this.userId = jwt_decode(localStorage.getItem('token'))._id;
    }
    this.usernameService.change.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) {
        this.userId = null;
      } else {
        this.userId = jwt_decode(localStorage.getItem('token'))._id;
      }
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
      this.song = data;
    });
  }
  getPostsBySongID(songID: string) {
    this.api.getPostsBySongID(songID).subscribe((data) => {
      this.posts = data;
    });
  }

  newTextPost(form: any) {
    // this.apiService.postSong(form.value);
    if (form.form.status === 'VALID') {
      this.api.postPost(this.song._id, form.value).subscribe((data) => {
        this.onSuccess();
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
      this.post = data;
    });
  }


 // deletePost(post) {
  deletePost(postID: string) {
      this.api.deletePost(postID).subscribe((data) => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.status = 'notLoggedIn';
        }
      }
      );
  }

  ownPost(uId) {
    return uId === this.userId;
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
