import { Component, OnInit } from '@angular/core';
import { HomeSideBarComponent } from './home-side-bar/home-side-bar.component';
import { CharacterType } from '../../core/models/CharacterType';
import { ApiService } from '../../core/services/api/api.service';
import { CharactersService } from '../../core/services/characters/characters.service';
import { SearchComponent } from '../../shared/components/search/search.component';
import { BarsComponent } from '../../shared/components/dashboard/bars/bars.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSideBarComponent, SearchComponent, BarsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public characters: CharacterType[] = [];
  public sortedChildrenLengths: number[] = [];
  public sortedFullNames: string[] = [];

  constructor(
    private api: ApiService,
    private characterService: CharactersService
  ) {}

  ngOnInit() {
    this.api.getAllData('characters').subscribe((characters) => {
      this.characters = characters;

      let selectedCharacter = undefined;
      this.characterService.character$.subscribe(
        (character) => (selectedCharacter = character.fullName)
      );
      if (selectedCharacter === undefined) {
        this.characterService.setCharacter(characters[0]);
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
