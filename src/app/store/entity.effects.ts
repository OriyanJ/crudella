import { Injectable } from '@angular/core';
import { EntityService } from '@app/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

import {
  AddEntityStart,
  AddEntitySuccess,
  EntityActionTypes,
  GetEntitiesStart,
  GetEntitiesSuccess,
  RemoveEntityStart,
  RemoveEntitySuccess
} from './entity.actions';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EntityEffects {
  constructor(
    private actions$: Actions,
    private entityService: EntityService,
    private router: Router
  ) {}

  @Effect() getEntities = this.actions$.pipe(
    ofType<GetEntitiesStart>(EntityActionTypes.GET_ENTITIES_START),
    mergeMap(() =>
      this.entityService
        .getEntities()
        .pipe(map(data => new GetEntitiesSuccess(data)))
    )
  );

  @Effect() addEntityStart = this.actions$.pipe(
    ofType<AddEntityStart>(EntityActionTypes.ADD_ENTITY_START),
    mergeMap(data =>
      this.entityService.addEntity(data.payload).pipe(
        map(data => {
          this.router.navigate(['/entity']);
          return new AddEntitySuccess(data);
        })
      )
    )
  );

  @Effect() removeEntity = this.actions$.pipe(
    ofType<RemoveEntityStart>(EntityActionTypes.REMOVE_ENTITY_START),
    mergeMap(data =>
      this.entityService
        .removeEntity(data.payload)
        .pipe(map(response => new RemoveEntitySuccess(data.payload)))
    )
  );
}
