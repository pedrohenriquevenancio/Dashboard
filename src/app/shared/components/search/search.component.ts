import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  public query = new FormControl('');

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.query.valueChanges.subscribe(query => this.api.setQuery(query as string));
  }

}
