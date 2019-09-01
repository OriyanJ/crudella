import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Entity } from '@app/models';
import { AppState } from '@app/store/app-state.model';
import { RemoveEntityStart } from '@app/store/entity.actions';
import { Store } from '@ngrx/store';

import { EntityDetailsComponent } from '../entity-details/entity-details.component';

@Component({
  selector: 'app-entity-item',
  templateUrl: './entity-item.component.html',
  styleUrls: ['./entity-item.component.scss']
})
export class EntityItemComponent implements OnInit {
  @Input() entity: Entity;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {}

  /**
   * Remove an entity by its ID.
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
