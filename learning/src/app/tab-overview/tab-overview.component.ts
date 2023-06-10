import { Component, Input } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ICourse } from '../models/course.model';
import { NgFor, NgIf } from '@angular/common';
import { CourseService } from '../services/course/course.service';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tab-overview',
  templateUrl: './tab-overview.component.html',
  standalone: true,
  imports: [NgbNavModule, NgIf, FontAwesomeModule, NgFor],
  styleUrls: ['./tab-overview.component.css'],
})
export class TabOverviewComponent {
  activeTab = 3;
  @Input() course: ICourse | null = null;
  faChevronDown = faChevronDown;
  faStar = faStar;
  constructor(public courseService: CourseService) {}

  formatDate(dateString: string) {
    const date = new Date(dateString);
    return Intl.DateTimeFormat('en-US').format(date);
  }
}
