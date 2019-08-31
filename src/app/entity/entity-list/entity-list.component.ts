import { Component, OnInit } from '@angular/core';
import { Entity } from '@app/models';
import { AppState } from '@app/store/app-state.model';
import { EntityState } from '@app/store/entity.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {
  entities$ = new Observable<Entity[]>();
  sortBy = 'dateTicks';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.entities$ = this.store
      .select(store => store.entities)
      .pipe(
        map((entities: EntityState) =>
          entities.items ? Object.values(entities.items) : []
        )
      );
  }
}
