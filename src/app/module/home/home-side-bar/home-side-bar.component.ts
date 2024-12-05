import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-home-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './home-side-bar.component.html',
  styleUrl: './home-side-bar.component.scss'
})
export class HomeSideBarComponent implements OnInit {
  public data:any = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getData('character').subscribe((data:any) => {
      this.data = data;
    });
    console.log('Data:', this.data);
  }
}
