import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService, EntityService } from '@app/services';
import { Entity } from '@app/models';
import * as CustomValidators from '../../custom-validators';
import { Router } from '@angular/router';

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
    private entityService: EntityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.entityService.loadEntities();
    this.entityForm = this.fb.group({
      name: [
        null,
        [Validators.required, Validators.maxLength(100), CustomValidators.noWhitespaceValidator]
      ],
      description: [null],
      date: [null],
      // I wasn't sure what was the meaning of "max 6 characters"
      amount: [null, [Validators.max(999999), CustomValidators.numeric]],
      privacy: ['public']
    });
  }

  onSubmit() {
    console.log(this.entityForm);

    if (this.entityForm.invalid) {
      this.notifyService.error(
        'Failed to create an entity. Please make sure all form inputs are valid.'
      );
      return;
    }

    this.createEntity();
  }

  logError() {
    console.log('error!');

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

    this.entityService.addEntity(entity).subscribe({
      next: () => {
        this.router.navigate(['/entity']);
      }
    });
  }
}
