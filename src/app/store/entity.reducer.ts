import { EntityActionTypes, EntityActions } from './entity.actions';
import { Entity } from '@app/models';

export interface EntityState {
  items: Entity[];
  loading: boolean;
}
const initialState: EntityState = {
  items: [],
  loading: false
};

export function EntityReducer(
  state: any = initialState,
  action: EntityActions
) {
  switch (action.type) {
    case EntityActionTypes.GET_ENTITIES_START:
    case EntityActionTypes.ADD_ENTITY_START:
    case EntityActionTypes.REMOVE_ENTITY_START:
      return { ...state, loading: true };

    case EntityActionTypes.GET_ENTITIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case EntityActionTypes.ADD_ENTITY_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false
      };

    case EntityActionTypes.REMOVE_ENTITY_SUCCESS:
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter((entity: Entity) => entity.id !== id),
        loading: false
      };

    case EntityActionTypes.REMOVE_ENTITY_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
}