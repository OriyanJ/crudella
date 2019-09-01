import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Entity } from '@app/models';
import { EntityService } from '@app/services';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss']
})
export class EntityDetailsComponent implements OnInit {
  entity$: Observable<Entity> = new Observable();
  entityId: string;

  constructor(
    private entityService: EntityService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.entityId = data.entityId;
  }

  ngOnInit() {
    this.entity$ = this.entityService.getById(this.entityId);
  }
}
