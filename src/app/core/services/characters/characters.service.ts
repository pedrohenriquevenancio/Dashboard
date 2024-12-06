import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterType } from '../../models/CharacterType';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private character = new BehaviorSubject<CharacterType>({} as CharacterType);
  public character$ = this.character.asObservable();

  constructor() { }

  public getCharacter() {
    return this.character.value;
  }

  public setCharacter(character: CharacterType) {
    this.character.next(character);
  }
}
