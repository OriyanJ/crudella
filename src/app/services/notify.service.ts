import { Injectable } from '@angular/core';
declare const $: any;

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor() {}

  error(text: string): void {
    this.notice('danger', text);
  }

  success(text: string): void {
    this.notice('success', text);
  }

  info(text: string): void {
    this.notice('info', text);
  }

  private notice(type: string, text: string) {
    $.notify(
      {
        message: text
      },
      {
        type: type,
        template: `
        <div data-notify="container" class="col-10 col-sm-4 alert alert-{0}" role="alert">
          <button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">
            <i class="material-icons">close</i>
          </button>
          <span data-notify="message">{2}</span>
        </div>`
      }
    );
  }
}
