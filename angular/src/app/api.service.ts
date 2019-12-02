import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public getSongs() {
    return this.httpClient.get(`${this.API_URL}/api/songs`);
  }
  public getSongByID(songID: string) {
    return this.httpClient.get<any>(`${this.API_URL}/api/songs/${songID}`);
  }
  public postSong(song: object) {
    return this.httpClient.post(`${this.API_URL}/api/songs`, song);
  }
  public postPost(songId: string, post: object) {
    return this.httpClient.post(`${this.API_URL}/api/songs/${songId}/posts`, post, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
