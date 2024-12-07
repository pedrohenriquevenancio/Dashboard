import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { CharacterType } from '../../models/CharacterType';
import { IConfigAPI } from '../../models/ApiTypes';
import { HttpClient } from '@angular/common/http';
import { HogwartsHousesService } from '../hogwarts-houses/hogwarts-houses.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService extends IConfigAPI {
  private character = new BehaviorSubject<CharacterType>({} as CharacterType);
  public character$ = this.character.asObservable();

  constructor(private http: HttpClient, private apiHouses: HogwartsHousesService) {
    super();
  }

  public getCharacter() {
    return this.character.value;
  }

  public setCharacter(character: CharacterType) {
    this.character.next(character);
  }

  public setQuery(query:string) {
    let capitalizeQuery = query && query.trim().length > 0 ? query.charAt(0).toUpperCase() + query.slice(1).toLowerCase() : '';
    this.querySubject.next(capitalizeQuery);
  }

  public getAllData() {
    return combineLatest([this.query$]).pipe(
      switchMap(([query]) => {
        let formattedQuery = query && query.trim().length > 0 ? `?search=${query}` : '';
        return this.http.get<CharacterType[]>(`${this.apiUrl}characters${formattedQuery}`);
      }),
      switchMap((characters) => {
        return forkJoin(
          characters.map(character => {
            return forkJoin({
              house: this.apiHouses.getDataByHouse(character.hogwartsHouse),
            }).pipe(
              map(({house}) => {
                return {
                  ...character,
                  house: house
                }
              })
            )
          })
        )
      })
    );
  }

  public getDataById(id: string) {
    return this.http.get<CharacterType>(`${this.apiUrl}/characters/${id}`);
  }
}
