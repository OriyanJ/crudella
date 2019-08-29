import { Component, OnInit } from '@angular/core';
import { EntityService } from '@app/services/entity.service';
import { Observable } from 'rxjs';
import { Entity } from '@app/models';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {
  entities$ = new Observable<Entity[]>();

  constructor(private entityService: EntityService) {}

  ngOnInit() {
    this.entities$ = this.entityService.selectEntities();
    this.entityService.loadEntities();
  }

  /**
   * Request a removal of an entity by an ID.
   * @param id Entity ID.
   */
  removeEntity(id: string) {
    this.entityService.removeEntity(id).subscribe(console.log);
  }

  addEntity() {
    this.entityService.addEntity().subscribe();
  }
}
