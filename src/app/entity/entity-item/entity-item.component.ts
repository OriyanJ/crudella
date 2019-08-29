import { Component, OnInit, Input, Inject } from '@angular/core';
import { Entity } from '@app/models';
import { EntityService } from '@app/services';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material/dialog';
import { EntityDetailsComponent } from '../entity-details/entity-details.component';

@Component({
  selector: 'app-entity-item',
  templateUrl: './entity-item.component.html',
  styleUrls: ['./entity-item.component.scss']
})
export class EntityItemComponent implements OnInit {
  @Input() entity: Entity;
  constructor(private entityService: EntityService, public dialog: MatDialog) {}

  ngOnInit() {}

  /**
   * Request a removal of an entity by an ID.
   * @param id Entity ID.
   */
  removeEntity() {
    this.entityService.removeEntity(this.entity.id).subscribe();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      entityId: this.entity.id
    };
    dialogConfig.width = '400px';

    this.dialog.open(EntityDetailsComponent, dialogConfig);
  }
}
