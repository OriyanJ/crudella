import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Entity } from '@app/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.scss']
})
export class EntityEditComponent implements OnInit {
  entity$ = new Observable<Entity>();
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.entity$ = this.route.data.pipe(
      map((resolved: Data) => (resolved.entity ? resolved.entity : null))
    );
  }
}
