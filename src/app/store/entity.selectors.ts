import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState } from './entity.reducer';

export const getEntities = createFeatureSelector('entities');

export const getMappedEntities = createSelector(
  getEntities,
  (state: EntityState) => state.items
);

export const getEntitiesArray = createSelector(
  getEntities,
  (state: EntityState) => Object.values(state.items)
);

export const getProgress = createSelector(
  getEntities,
  (state: EntityState) => state.loading
);
