import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { CharacterType } from "./CharacterType";
import { HogwartsHouseType } from "./HogwartsHouseType";

export type ApiResponseType = CharacterType | HogwartsHouseType;

export abstract class IConfigAPI {
  public apiUrl: string = 'https://potterapi-fedeperin.vercel.app/pt/';
  public querySubject = new BehaviorSubject<string>('');
  public query$ = this.querySubject.asObservable().pipe(distinctUntilChanged());
  abstract setQuery(query:string): void;
  abstract getAllData(endpoint:string): Observable<ApiResponseType[]>;
  abstract getDataById(id:string): Observable<ApiResponseType>;
}
