import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityService, NotifyService } from '@app/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  AddEntityFailed,
  AddEntityStart,
  AddEntitySuccess,
  EntityActionTypes,
  GetEntitiesFailed,
  GetEntitiesStart,
  GetEntitiesSuccess,
  RemoveEntityFailed,
  RemoveEntityStart,
  RemoveEntitySuccess
} from './entity.actions';

@Injectable({ providedIn: 'root' })
export class EntityEffects {
  @Effect() getEntities = this.actions$.pipe(
    ofType<GetEntitiesStart>(EntityActionTypes.GET_ENTITIES_START),
    mergeMap(() =>
      this.entityService.getEntities().pipe(
        map(data => new GetEntitiesSuccess(data)),
        catchError(error => {
          this.notifyService.error('Failed to get entities');
          return of(new GetEntitiesFailed());
        })
      )
    )
  );

  @Effect() addEntityStart = this.actions$.pipe(
    ofType<AddEntityStart>(EntityActionTypes.ADD_ENTITY_START),
    mergeMap((action: any) =>
      this.entityService.addEntity(action.payload).pipe(
        map(data => {
          this.router.navigate(['/entity']);
          return new AddEntitySuccess(data);
        }),
        catchError(error => {
          this.notifyService.error('Failed to add a new entity');
          return of(new AddEntityFailed());
        })
      )
    )
  );

  @Effect() removeEntity = this.actions$.pipe(
    ofType<RemoveEntityStart>(EntityActionTypes.REMOVE_ENTITY_START),
    mergeMap((action: any) =>
      this.entityService.removeEntity(action.payload).pipe(
        map(response => new RemoveEntitySuccess(action.payload)),
        catchError(error => {
          this.notifyService.error('Failed to remove entity');
          return of(new RemoveEntityFailed());
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private entityService: EntityService,
    private router: Router,
    private notifyService: NotifyService
  ) {}
}
