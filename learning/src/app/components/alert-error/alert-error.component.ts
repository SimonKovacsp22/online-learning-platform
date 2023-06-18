import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css'],
})
export class AlertErrorComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
  @Output() onClose = new EventEmitter<boolean>();
  close() {
    this.onClose.emit(false);
  }
}
