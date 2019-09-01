import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './store/app-state.model';
import { GetEntitiesStart } from './store/entity.actions';
import { getEntitiesArray, getProgress } from './store/entity.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetEntitiesStart());
    this.store.select(getEntitiesArray).subscribe(dd => {
      console.log(dd);
    });
    this.store.select(getProgress).subscribe(prg => {
      console.log(prg);
    });
  }
}
