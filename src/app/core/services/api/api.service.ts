import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, interval, Observable, switchMap, timer } from 'rxjs';
import { CharacterType } from '../../models/CharacterType';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'https://potterapi-fedeperin.vercel.app/pt/';
  private querySubject = new BehaviorSubject<string>('');
  public query$ = this.querySubject.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {}

  public setQuery(query:string) {
    let capitalizeQuery = query && query.trim().length > 0 ? query.charAt(0).toUpperCase() + query.slice(1).toLowerCase() : '';
    console.log(query,capitalizeQuery);
    this.querySubject.next(capitalizeQuery);
  }

  public getAllData(endpoint:string): Observable<CharacterType[]> {
    return combineLatest([this.query$]).pipe(
      switchMap(([query]) => {
        let formattedQuery = query && query.trim().length > 0 ? `?search=${query}` : '';
        return this.http.get<CharacterType[]>(`${this.baseURL}${endpoint}${formattedQuery}`);
      })
    );
  }

  public getDataById(endpoint:string,id:string): Observable<CharacterType> {
    return this.http.get<CharacterType>(`${this.baseURL}${endpoint}/${id}`);
  }
}
