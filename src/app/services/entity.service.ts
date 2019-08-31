import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity, EntityJson, EntityListJson } from '@app/models';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NotifyService } from './notify.service';

const endpoint = `${environment.apiUrl}/Entity`;

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private _entities$ = new BehaviorSubject<{}>(null);
  readonly entities$ = this._entities$.asObservable();

  constructor(private http: HttpClient, private notifyService: NotifyService) {}

  /**
   * Get entities state.
   */
  selectEntities(): Observable<Entity[]> {
    return this._entities$.pipe(
      map(entities => (entities ? Object.values(entities) : []))
    );
  }

  /**
   * Load entities into the state.
   */
  loadEntities() {
    const state = this._entities$.getValue();

    // Don't load if the state is already filled with data.
    if (state && Object.keys(state).length) {
      return;
    }

    // Otherwise, make an API request.
    this.getEntities().subscribe((entities: Entity[]) => {
      const mappedEntities = this.mapEntities(entities);
      this._entities$.next(mappedEntities);
    });
  }

  addEntity(entity?: Entity) {
    const data = entity.toJson(entity);
    return this.http.post(endpoint, data).pipe(
      tap((json: EntityJson) => {
        const newEntity = new Entity(json);
        const state = this._entities$.getValue();
        state[json.Id] = newEntity;
        this._entities$.next(state);
        this.notifyService.success('Created a new entity.'); // Success notification.
      })
    );
  }

  /**
   * Remove an entity by an ID.
   * @param id Entity ID.
   */
  removeEntity(id: string) {
    return this.http.delete<string>(`${endpoint}/${id}`).pipe(
      tap(() => {
        const state = this._entities$.getValue();
        delete state[id];
        this._entities$.next(state);
        this.notifyService.success('Removed entity.'); // Success notification.
      })
    );
  }

  /**
   * Get a list of entities.
   */
  private getEntities(): Observable<Array<Entity>> {
    return this.http
      .get<EntityListJson>(endpoint)
      .pipe(map(json => this.deserializeEntities(json)));
  }

  /**
   * Get an entity by its ID.
   * @param id Entity ID.
   */
  getById(id: string) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http
      .get<EntityJson>(endpoint, { params: params })
      .pipe(map(json => new Entity(json)));
  }

  /**
   * Map the entities coming from the API from an array to an Object of entities.
   * This is done in order to manage the state easily.
   */
  private mapEntities(entities: Entity[]) {
    const entitisObject = {};
    entities.forEach(entity => {
      entitisObject[entity.id] = entity;
    });
    return entitisObject;
  }

  private deserializeEntities(entities: EntityListJson) {
    return entities.List.map((entity: EntityJson) => new Entity(entity));
  }
}
