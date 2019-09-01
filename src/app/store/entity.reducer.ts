import { EntityActionTypes, EntityActions } from './entity.actions';
import { Entity } from '@app/models';

export interface EntityState {
  items: {};
  loading: boolean;
}
const initialState: EntityState = {
  items: {},
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
      return { ...state, items: mapEntities(action.payload), loading: false };

    case EntityActionTypes.ADD_ENTITY_SUCCESS:
      const entity = action.payload;
      return {
        ...state,
        items: { ...state.items, entity },
        loading: false
      };

    case EntityActionTypes.REMOVE_ENTITY_SUCCESS:
      const items = state.items;
      delete items[action.payload];
      return { ...state, items: items, loading: false };

    default:
      return state;
  }
}

/**
 * Map the entities coming from the API from an array to an Object of entities.
 * This is done in order to manage the state easily.
 */
function mapEntities(entities: Entity[]) {
  const entitisObject = {};
  entities.forEach(entity => {
    entitisObject[entity.id] = entity;
  });
  return entitisObject;
}
