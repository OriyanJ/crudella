import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Entity } from '@app/models';
import { EntityService } from '@app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EntityDetailsComponent } from '../entity-details/entity-details.component';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-state.model';
import { RemoveEntityStart } from '@app/store/entity.actions';

@Component({
  selector: 'app-entity-item',
  templateUrl: './entity-item.component.html',
  styleUrls: ['./entity-item.component.scss']
})
export class EntityItemComponent implements OnInit, OnDestroy {
  @Input() entity: Entity;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private entityService: EntityService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Request a removal of an entity by an ID.
   * @param id Entity ID.
   */
  removeEntity() {
    this.store.dispatch(new RemoveEntityStart(this.entity.id));
  }

  /**
   * Open a dialog with the entity's details.
   */
  showEntityDetails(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      entityId: this.entity.id
    };
    dialogConfig.width = '400px';

    this.dialog.open(EntityDetailsComponent, dialogConfig);
  }
}
