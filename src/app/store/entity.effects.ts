import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityService } from '@app/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import {
  AddEntityStart,
  AddEntitySuccess,
  EntityActionTypes,
  GetEntitiesStart,
  GetEntitiesSuccess,
  RemoveEntityStart,
  RemoveEntitySuccess
} from './entity.actions';

@Injectable({ providedIn: 'root' })
export class EntityEffects {
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
    mergeMap((action: any) =>
      this.entityService.addEntity(action.payload).pipe(
        map(data => {
          this.router.navigate(['/entity']);
          return new AddEntitySuccess(data);
        })
      )
    )
  );

  @Effect() removeEntity = this.actions$.pipe(
    ofType<RemoveEntityStart>(EntityActionTypes.REMOVE_ENTITY_START),
    mergeMap((action: any) =>
      this.entityService
        .removeEntity(action.payload)
        .pipe(map(response => new RemoveEntitySuccess(action.payload)))
    )
  );

  constructor(
    private actions$: Actions,
    private entityService: EntityService,
    private router: Router
  ) {}
}
