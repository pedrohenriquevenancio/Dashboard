import { Component, OnInit } from '@angular/core';
import { CharacterType } from '../../../core/models/CharacterType';
import { CharactersService } from '../../../core/services/characters/characters.service';

@Component({
  selector: 'app-home-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './home-side-bar.component.html',
  styleUrl: './home-side-bar.component.scss'
})
export class HomeSideBarComponent implements OnInit {
  public character:CharacterType = {} as CharacterType;

  constructor(private api: CharactersService) {}

  ngOnInit() {
    this.api.character$.subscribe(character => {
      this.character = character;
    });
  }
}
