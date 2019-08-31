import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity, EntityJson, EntityListJson } from '@app/models';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = `${environment.apiUrl}/Entity`;

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private _entities$ = new BehaviorSubject<{}>(null);
  readonly entities$ = this._entities$.asObservable();

  constructor(private http: HttpClient) {}

  addEntity(entity?: Entity) {
    return this.http
      .post(endpoint, entity.toJson(entity))
      .pipe(map((json: EntityJson) => new Entity(json)));
  }

  /**
   * Remove an entity by an ID.
   * @param id Entity ID.
   */
  removeEntity(id: string) {
    return this.http.delete(`${endpoint}/${id}`);
  }

  /**
   * Get a list of entities.
   */
  getEntities(): Observable<Array<Entity>> {
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

  private deserializeEntities(entities: EntityListJson) {
    return entities.List.map((entity: EntityJson) => new Entity(entity));
  }
}
