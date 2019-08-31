import { Component, OnDestroy, OnInit } from '@angular/core';
import { Entity } from '@app/models';
import { EntityService } from '@app/services/entity.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  entities$ = new Observable<Entity[]>();
  sortBy = 'dateTicks';

  constructor(private entityService: EntityService) {}

  ngOnInit() {
    this.entities$ = this.entityService.selectEntities();
    this.entityService.loadEntities();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
