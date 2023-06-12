import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.css'],
})
export class AlertSuccessComponent {
  staticAlertClosed = false;
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Output() onClose = new EventEmitter<boolean>();

  close() {
    this.onClose.emit(false);
  }
}
