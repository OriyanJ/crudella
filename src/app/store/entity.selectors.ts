import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState } from './entity.reducer';

export const getState = createFeatureSelector('entities');

export const getEntities = createSelector(
  getState,
  (state: EntityState) => state.items
);

export const getProgress = createSelector(
  getState,
  (state: EntityState) => state.loading
);
