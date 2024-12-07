import { Component } from '@angular/core';
import { HomeSideBarComponent } from './home-side-bar/home-side-bar.component';
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
