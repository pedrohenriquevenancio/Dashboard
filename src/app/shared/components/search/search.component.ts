import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharactersService } from '../../../core/services/characters/characters.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  public query = new FormControl('');

  constructor(private api: CharactersService) {}

  ngOnInit() {
    this.query.valueChanges.subscribe(query => this.api.setQuery(query as string));
  }

}
