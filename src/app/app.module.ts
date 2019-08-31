import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
    FormErrorHandlerComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EntityDetailsComponent]
})
export class AppModule {}
