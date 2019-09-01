import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity } from '@app/models';
import { NotifyService } from '@app/services';
import { AppState } from '@app/store/app-state.model';
import { AddEntityStart } from '@app/store/entity.actions';
import { Store } from '@ngrx/store';

import * as CustomValidators from '../../custom-validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {
  entityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notifyService: NotifyService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize the create entity form.
   */
  initForm() {
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

  /**
   * Handle the form submission.
   */
  onSubmit() {
    if (this.entityForm.invalid) {
      this.notifyService.error(
        'Failed to create an entity. Please make sure all form inputs are valid.'
      );
      return;
    }

    this.createEntity();
  }

  /**
   * Create a new entity and add it to the state.
   */
  createEntity() {
    this.entityForm.disable();

    const entity = new Entity();
    if (this.entityForm.value.name) {
      entity.name = this.entityForm.value.name.trim();
    }
    if (this.entityForm.value.description) {
      entity.description = this.entityForm.value.description.trim();
    }
    if (this.entityForm.value.date) {
      entity.dateFormatted = this.entityForm.value.date;
    }
    if (this.entityForm.value.amount) {
      entity.amount = this.entityForm.value.amount;
    }
    entity.isPrivate = this.entityForm.value.privacy === 'private';

    this.store.dispatch(new AddEntityStart(entity));
  }
}
