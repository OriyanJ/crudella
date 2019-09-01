import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store/app-state.model';
import { getEntitiesArray } from '@app/store/entity.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {
  entities$ = new Observable();
  sortBy = 'dateTicks';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.entities$ = this.store.select(getEntitiesArray);
  }
}
