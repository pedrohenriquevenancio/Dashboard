import { Component } from '@angular/core';
import { HomeSideBarComponent } from './home-side-bar/home-side-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeSideBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
