import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './entity/create/create.component';
import { EntityEditComponent } from './entity/entity-edit/entity-edit.component';
import { EntityListComponent } from './entity/entity-list/entity-list.component';
import { EntityComponent } from './entity/entity.component';
import { GetEntityResolve } from './resolvers/get-entity.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'entity',
    pathMatch: 'full'
  },
  {
    path: 'entity',
    component: EntityComponent,
    children: [
      { path: '', component: EntityListComponent },
      { path: 'create', component: CreateComponent },
      {
        path: ':id',
        component: EntityEditComponent,
        resolve: { entity: GetEntityResolve }
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
