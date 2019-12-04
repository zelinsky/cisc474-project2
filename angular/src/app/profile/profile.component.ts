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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  userPosts;
  userComments;

  selectedFile: ImageSnippet;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getUserByID(params.get('userID'));
      this.getPostsByUserID(params.get('userID'));
      this.getCommentsByUserID(params.get('userID'));
    });
  }

  getUserByID(userID: string) {
    this.api.getUserByID(userID).subscribe((data) => {
      console.log(data);
      this.user = data;
    });
  }

  getPostsByUserID(userID: string) {
    this.api.getPostsByUserID(userID).subscribe((data) => {
      console.log(data);
      this.userPosts = data;
    });
  }
  getCommentsByUserID(userID: string) {
    this.api.getCommentsByUserID(userID).subscribe((data) => {
      console.log(data);
      this.userComments = data;
    });
  }

}
