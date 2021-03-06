import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import { environment } from '../environments/environment';
import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  public getPosts() {
    return this.httpClient.get(`${this.API_URL}/api/posts`);
  }
  public getPostsBySongID(songID: string) {
    return this.httpClient.get(`${this.API_URL}/api/songs/${songID}/posts`);
  }
  public getPostsByUserID(userID: string) {
    return this.httpClient.get(`${this.API_URL}/api/users/${userID}/posts`);
  }
  public getCommentsByUserID(userID: string) {
    return this.httpClient.get(`${this.API_URL}/api/users/${userID}/comments`);
  }
  public getSongs() {
    return this.httpClient.get(`${this.API_URL}/api/songs`);
  }
  public getSongByID(songID: string) {
    return this.httpClient.get(`${this.API_URL}/api/songs/${songID}`);
  }
  public getUserByID(userID: string) {
    return this.httpClient.get(`${this.API_URL}/api/users/${userID}`);
  }
  public postSong(song: object) {
    return this.httpClient.post(`${this.API_URL}/api/songs`, song);
  }
  public postPost(songId: string, post: any) {
    if (localStorage.getItem('token') !== null) {
      const header = {
       headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
      };
      return this.httpClient.post(`${this.API_URL}/api/songs/${songId}/posts`, post, header);
    } else {
      return this.httpClient.post(`${this.API_URL}/api/songs/${songId}/posts`, post);
    }
  }

  public getPostByID(postId: string) {
    return this.httpClient.get(`${this.API_URL}/api/posts/${postId}`);
  }

  public deletePost(postId: string) {
    if (localStorage.getItem('token') !== null) {
      const header = {
       headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
      };
      return this.httpClient.delete(`${this.API_URL}/api/posts/${postId}`, header);
    } else {
      return this.httpClient.delete(`${this.API_URL}/api/posts/${postId}`);
    }
  }

  public login(username: string, password: string){
    return this.httpClient.post(`${this.API_URL}/api/login`, {'username': username, 'password': password}, {observe: 'response'});
  }

  public register(username: string, firstName: string, lastName: string, password: string) {
    return this.httpClient.post(`${this.API_URL}/api/register`,
    {'username':username, 'firstName': firstName, "lastName": lastName, "password": password},
    {observe: 'response'});
  }
}
