import { Component, OnInit } from '@angular/core';
import { HomeSideBarComponent } from './home-side-bar/home-side-bar.component';
import { CharacterType } from '../../core/models/CharacterType';
import { ApiService } from '../../core/services/api/api.service';
import { CharactersService } from '../../core/services/characters/characters.service';
import { SearchComponent } from '../../shared/components/search/search.component';
import { BarsComponent } from '../../shared/components/dashboard/bars/bars.component';
import { HomeMainComponent } from "./home-main/home-main.component";
import { HomeRightSideBarComponent } from "./home-right-side-bar/home-right-side-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSideBarComponent, HomeMainComponent, HomeRightSideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
