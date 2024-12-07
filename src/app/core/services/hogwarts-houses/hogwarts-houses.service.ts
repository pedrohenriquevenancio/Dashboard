import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, first, map, switchMap } from 'rxjs';
import { HogwartsHouseType } from '../../models/HogwartsHouseType';
import { IConfigAPI } from '../../models/ApiTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HogwartsHousesService extends IConfigAPI {
  private house = new BehaviorSubject<HogwartsHouseType>({} as HogwartsHouseType);
  public house$ = this.house.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  public getHouse() {
    return this.house.value;
  }

  public setHouse(house: HogwartsHouseType) {
    this.house.next(house);
  }

  public setQuery(query:string) {
    let capitalizeQuery = query && query.trim().length > 0 ? query.charAt(0).toUpperCase() + query.slice(1).toLowerCase() : '';
    this.querySubject.next(capitalizeQuery);
  }

  public getAllData() {
    return combineLatest([this.query$]).pipe(
      switchMap(([query]) => {
        let formattedQuery = query && query.trim().length > 0 ? `?search=${query}` : '';
        return this.http.get<HogwartsHouseType[]>(`${this.apiUrl}houses${formattedQuery}`);
      })
    );
  }

  public getDataById(id: string) {
    return this.http.get<HogwartsHouseType>(`${this.apiUrl}houses/${id}`);
  }

  public getDataByHouse(houseName: string) {
    houseName = houseName.trim().toLowerCase();
    return this.http.get<HogwartsHouseType[]>(`${this.apiUrl}houses`).pipe(
      map(hogwartsHouses => hogwartsHouses.find(h => h.house.toLowerCase() === houseName) || {} as HogwartsHouseType),
      first(),
    );
  }
}
