import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'https://api.disneyapi.dev/';

  constructor(private http: HttpClient) {}

  public getData(endpoint:string,query = null) {
    let formattedQuery = query ? `/${query}` : '';
    return interval(5000).pipe(
      switchMap(() => this.http.get(`${this.baseURL}${endpoint}${formattedQuery}`))
    );
  }
}
