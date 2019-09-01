import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { EntityService } from '@app/services';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetEntityResolve implements Resolve<any> {
  constructor(private entityService: EntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const entityId = route.paramMap.get('id');
    return this.entityService.getById(entityId);
  }
}
