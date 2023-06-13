import { Component, Input } from '@angular/core';
import { faOtter } from '@fortawesome/free-solid-svg-icons';
import { ICourse } from '../../models/course.model';

@Component({
  selector: 'app-nav-private',
  templateUrl: './nav-private.component.html',
  styleUrls: ['./nav-private.component.css'],
})
export class NavPrivateComponent {
  faOtter = faOtter;
  @Input() title: String | undefined = undefined;
}
