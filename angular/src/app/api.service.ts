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
  public getSongs() {
    return this.httpClient.get(`${this.API_URL}/api/songs`);
  }
  public getSongByID(songID: string) {
    return this.httpClient.get<any>(`${this.API_URL}/api/songs/${songID}`);
  }
}
