import { Component } from '@angular/core';
import { CircleComponent } from "../../../shared/components/dashboard/circle/circle.component";
import { HogwartsHouseType } from '../../../core/models/HogwartsHouseType';
import { ApiService } from '../../../core/services/api/api.service';
import { HogwartsHousesService } from '../../../core/services/hogwarts-houses/hogwarts-houses.service';

@Component({
  selector: 'app-home-right-side-bar',
  standalone: true,
  imports: [CircleComponent],
  templateUrl: './home-right-side-bar.component.html',
  styleUrl: './home-right-side-bar.component.scss'
})
export class HomeRightSideBarComponent {
  public hogwartsHouse: HogwartsHouseType[] = [];
  public sortedCharactersHouse: number[] = [];
  public sortedFullNames: string[] = [];

  constructor(
    private api: HogwartsHousesService,
  ) {}

  ngOnInit() {
    this.api.getAllData().subscribe((hogwartsHouse) => {
      this.hogwartsHouse = hogwartsHouse;
      // let selectedCharacter = undefined;
      // this.houseService.character$.subscribe(
      //   (character) => (selectedCharacter = character.fullName)
      // );
      // if (selectedCharacter === undefined) {
      //   this.houseService.setCharacter(characters[0]);
      // }

      // this.sortedCharactersHouse = hogwartsHouse
      //   .map((hogwartsHouse) => hogwartsHouse.)
      //   .sort((a, b) => b - a);
      // this.sortedFullNames = characters
      //   .sort((a, b) => b.children.length - a.children.length)
      //   .map((character) => character.fullName);
    });
  }
}
