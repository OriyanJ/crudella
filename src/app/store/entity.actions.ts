import { Entity } from '@app/models';

export enum EntityActionTypes {
  GET_ENTITIES_START = '[Entity] Get entities START',
  GET_ENTITIES_SUCCESS = '[Entity] Get entities SUCCESS',
  ADD_ENTITY_START = '[Add Entity] Add entity START',
  ADD_ENTITY_SUCCESS = '[Add Entity] Add entity SUCCESS',
  REMOVE_ENTITY_START = '[Remove Entity] Remove entity START',
  REMOVE_ENTITY_SUCCESS = '[Remove Entity] Remove entity SUCCESS'
}

export class GetEntitiesStart {
  readonly type = EntityActionTypes.GET_ENTITIES_START;
  constructor() {}
}

export class GetEntitiesSuccess {
  readonly type = EntityActionTypes.GET_ENTITIES_SUCCESS;
  constructor(public payload: Entity[]) {}
}

export class AddEntityStart {
  readonly type = EntityActionTypes.ADD_ENTITY_START;
  constructor(public payload: Entity) {}
}

export class AddEntitySuccess {
  readonly type = EntityActionTypes.ADD_ENTITY_SUCCESS;
  constructor(public payload: Entity) {}
}

export class RemoveEntityStart {
  readonly type = EntityActionTypes.REMOVE_ENTITY_START;
  constructor(public payload: string) {}
}

export class RemoveEntitySuccess {
  readonly type = EntityActionTypes.REMOVE_ENTITY_SUCCESS;
  constructor(public payload: string) {}
}

export type EntityActions =
  | GetEntitiesStart
  | GetEntitiesSuccess
  | AddEntityStart
  | AddEntitySuccess
  | RemoveEntityStart
  | RemoveEntitySuccess;
