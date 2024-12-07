import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './card-title.component.html',
  styleUrl: './card-title.component.scss'
})
export class CardTitleComponent {
  @Input() icon: string|null = null;
  @Input() image: string|null = null;
  @Input() title: string = '';
  @Input() align: string = 'text-center';

  constructor() {}
}
