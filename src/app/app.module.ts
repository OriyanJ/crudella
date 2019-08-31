import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CreateComponent } from './entity/create/create.component';
import { EntityDetailsComponent } from './entity/entity-details/entity-details.component';
import { EntityItemComponent } from './entity/entity-item/entity-item.component';
import { EntityListComponent } from './entity/entity-list/entity-list.component';
import { EntityComponent } from './entity/entity.component';
import { FormErrorHandlerComponent } from './form-error-handler/form-error-handler.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { StoreModule } from '@ngrx/store';
import { EntityReducer } from './store/entity.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EntityEffects } from './store/entity.effects';

const materialComponents = [
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [
    ...materialComponents,
    StoreModule.forRoot({
      entities: EntityReducer
    }),
    EffectsModule.forRoot([EntityEffects]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    EntityComponent,
    EntityListComponent,
    EntityItemComponent,
    EntityDetailsComponent,
    CreateComponent,
    FormErrorHandlerComponent,
    SortByPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [EntityDetailsComponent]
})
export class AppModule {}
