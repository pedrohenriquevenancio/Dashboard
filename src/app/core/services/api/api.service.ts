import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, switchMap } from 'rxjs';
import { CharacterType } from '../../models/CharacterType';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'https://potterapi-fedeperin.vercel.app/pt/';
  private query = new BehaviorSubject<string | null>(null);
  public query$ = this.query.asObservable();

  constructor(private http: HttpClient) {}

  public setQuery(query:string) {
    this.query.next(query);
  }

  public getAllData(endpoint:string): Observable<CharacterType[]> {
    let formattedQuery = '';
    this.query$.subscribe(query => {
      if (query) formattedQuery = `/${query}`;
    });
    return interval(5000).pipe(
      switchMap(() => this.http.get<CharacterType[]>(`${this.baseURL}${endpoint}${formattedQuery}`))
    );
  }

  public getDataById(endpoint:string,id:string): Observable<CharacterType> {
    return this.http.get<CharacterType>(`${this.baseURL}${endpoint}/${id}`);
  }
}
