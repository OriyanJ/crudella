import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './store/app-state.model';
import { GetEntitiesStart } from './store/entity.actions';
import { getProgress } from './store/entity.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showProgress$ = new Observable<boolean>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetEntitiesStart());
    this.showProgress$ = this.store.select(getProgress);
  }
}
