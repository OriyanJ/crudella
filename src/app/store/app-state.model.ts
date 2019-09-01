import { EntityState } from './entity.reducer';

export interface AppState {
  readonly entities: EntityState;
}
