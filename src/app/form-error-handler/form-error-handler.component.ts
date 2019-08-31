import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-form-error-handler',
  templateUrl: './form-error-handler.component.html',
  styleUrls: ['./form-error-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorHandlerComponent implements OnInit {
  @Input() errors: {};
  constructor() { }

  ngOnInit() {
  }

  /**
   * Return an error message accordingly.
   */
  get errorMessage(): string {
    const errorKey = Object.keys(this.errors)[0];
    const error = this.errors[errorKey];

    switch (errorKey) {
      case 'required':
      case 'whitespaces':
        return 'Input is required'
      case 'maxlength':
        return `Up to ${error.requiredLength} characters allowed`;
      case 'numeric':
        return 'Only numebrs are allowed';
      default:
        return 'Input is invalid'
    }
  }

}
