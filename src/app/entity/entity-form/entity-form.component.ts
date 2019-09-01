import { Component, Input, OnInit } from '@angular/core';
import { Entity } from '@app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyService } from '@app/services';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-state.model';
import * as CustomValidators from '../../custom-validators';
import { AddEntityStart, UpdateEntityStart } from '@app/store/entity.actions';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() entity?: Entity;

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
    const name = this.isEdit ? this.entity.name : null;
    const description = this.isEdit ? this.entity.description : null;
    const dateTicks = this.isEdit
      ? this.entity.dateTicks
        ? this.entity.tickToDate(this.entity.dateTicks)
        : null
      : null;
    const amount = this.isEdit ? this.entity.amount : null;
    const privacy = this.isEdit
      ? this.entity.isPrivate
        ? 'private'
        : 'public'
      : 'private';

    this.entityForm = this.fb.group({
      name: [
        name,
        [
          Validators.required,
          Validators.maxLength(100),
          CustomValidators.noWhitespaceValidator
        ]
      ],
      description: [description],
      date: [dateTicks],
      // I wasn't sure what was the meaning of "max 6 characters"
      amount: [amount, [Validators.max(999999), CustomValidators.numeric]],
      privacy: [privacy]
    });
  }

  /**
   * Handle the form submission.
   */
  onSubmit() {
    if (this.entityForm.invalid) {
      this.notifyService.error('Please make sure all form inputs are valid.');
      return;
    }

    this.entityForm.disable();
    const entity = this.createEntity();
    if (this.isEdit) {
      this.store.dispatch(new UpdateEntityStart(entity));
    } else {
      this.store.dispatch(new AddEntityStart(entity));
    }
  }

  /**
   * Create a new entity and add it to the state.
   */
  createEntity(): Entity {
    const entity = new Entity();
    if (this.isEdit) {
      entity.id = this.entity.id;
    }
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

    return entity;
  }
}
