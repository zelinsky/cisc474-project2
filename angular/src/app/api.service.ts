import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  public getPosts() {
    return this.httpClient.get(`${this.API_URL}/api/posts`);
  }
}
