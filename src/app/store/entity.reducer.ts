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
    case EntityActionTypes.UPDATE_ENTITY_START:
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

    case EntityActionTypes.UPDATE_ENTITY_SUCCESS:
      const items = state.items.map((entity: Entity) => {
        if (entity.id === action.payload.id) {
          return action.payload;
        }
        return entity;
      });
      return {
        ...state,
        items: items,
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
    case EntityActionTypes.ADD_ENTITY_FAILED:
    case EntityActionTypes.UPDATE_ENTITY_FAILED:
    case EntityActionTypes.GET_ENTITIES_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
}
