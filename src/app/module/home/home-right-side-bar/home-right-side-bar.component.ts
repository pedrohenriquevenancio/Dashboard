import { Component } from '@angular/core';
import { CircleComponent } from "../../../shared/components/dashboard/circle/circle.component";
import { HogwartsHouseType } from '../../../core/models/HogwartsHouseType';
import { HogwartsHousesService } from '../../../core/services/hogwarts-houses/hogwarts-houses.service';
import { CardTitleComponent } from "../../../shared/components/card-title/card-title.component";
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-home-right-side-bar',
  standalone: true,
  imports: [CircleComponent, CardTitleComponent, NgFor, NgClass],
  templateUrl: './home-right-side-bar.component.html',
  styleUrl: './home-right-side-bar.component.scss'
})
export class HomeRightSideBarComponent {
  public house: HogwartsHouseType = {} as HogwartsHouseType;
  public hogwartsHouses: HogwartsHouseType[] = [];
  public charactersByHouse: number[] = [];
  public housesNames: string[] = [];
  public housesColors: string[] = [];

  constructor(
    private api: HogwartsHousesService,
  ) {}

  ngOnInit() {
    this.api.getAllData().subscribe((hogwartsHouse) => {
      this.hogwartsHouses = hogwartsHouse;

      let selectedHouse = undefined;
      this.api.house$.subscribe(
        (house) => (selectedHouse = house.house)
      );
      if (selectedHouse === undefined) {
        this.api.setHouse(hogwartsHouse[0]);
      }

      this.charactersByHouse = this.hogwartsHouses.map((house) => {
        return house.characters?.length ?? 0;
      });
      this.housesNames = hogwartsHouse.map((house) => house.house);
      this.housesColors = hogwartsHouse.map((house) => house.colors[0]??'rgba(201, 203, 207, 0.2)');
    });
    this.api.house$.subscribe(house => this.house = house);
  }
}
