import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BarsComponent } from '../../../shared/components/dashboard/bars/bars.component';
import { CharacterType } from '../../../core/models/CharacterType';
import { CharactersService } from '../../../core/services/characters/characters.service';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [SearchComponent, BarsComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.scss'
})
export class HomeMainComponent implements OnInit {
  public characters: CharacterType[] = [];
  public sortedChildrenLengths: number[] = [];
  public sortedFullNames: string[] = [];

  constructor(
    private api: CharactersService
  ) {}

  ngOnInit() {
    this.api.getAllData().subscribe((characters) => {
      this.characters = characters;
      console.log(this.characters);

      let selectedCharacter = undefined;
      this.api.character$.subscribe(
        (character) => (selectedCharacter = character.fullName)
      );
      if (selectedCharacter === undefined) {
        this.api.setCharacter(characters[0]);
      }

      this.sortedChildrenLengths = characters
        .map((character) => character.children.length)
        .sort((a, b) => b - a);
      this.sortedFullNames = characters
        .sort((a, b) => b.children.length - a.children.length)
        .map((character) => character.fullName);
    });
  }
}
