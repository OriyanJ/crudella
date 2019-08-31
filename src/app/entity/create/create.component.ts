import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Entity } from '@app/models';
import { EntityService, NotifyService } from '@app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as CustomValidators from '../../custom-validators';
import { AppState } from '@app/store/app-state.model';
import { Store } from '@ngrx/store';
import { AddEntityStart } from '@app/store/entity.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  entityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notifyService: NotifyService,
    private entityService: EntityService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.entityForm = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.maxLength(100),
          CustomValidators.noWhitespaceValidator
        ]
      ],
      description: [null],
      date: [null],
      // I wasn't sure what was the meaning of "max 6 characters"
      amount: [null, [Validators.max(999999), CustomValidators.numeric]],
      privacy: ['public']
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (this.entityForm.invalid) {
      this.notifyService.error(
        'Failed to create an entity. Please make sure all form inputs are valid.'
      );
      return;
    }

    this.createEntity();
  }

  createEntity() {
    this.entityForm.disable();

    const entity = new Entity();
    if (this.entityForm.value.name) {
      entity.name = this.entityForm.value.name.trim();
    }
    if (this.entityForm.value.description) {
      entity.description = this.entityForm.value.description;
    }
    if (this.entityForm.value.date) {
      entity.dateFormatted = this.entityForm.value.date;
    }
    if (this.entityForm.value.amount) {
      entity.amount = this.entityForm.value.amount;
    }
    entity.isPrivate = this.entityForm.value.privacy === 'private';

    this.store.dispatch(new AddEntityStart(entity));
    return;
    // Attempt to create a new entity.
    this.entityService
      .addEntity(entity)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => this.router.navigate(['/entity']),
        error: () => this.entityForm.enable()
      });
  }
}
