import { Component, Input } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { IRating } from '../models/rating.model';
import { ICourse } from '../models/course.model';
import { NgIf } from '@angular/common';
import { CourseService } from '../services/course/course.service';
import { LoginService } from '../services/login/login.service';
@Component({
  selector: 'app-tab-overview',
  templateUrl: './tab-overview.component.html',
  standalone: true,
  imports: [NgbNavModule, NgIf],
  styleUrls: ['./tab-overview.component.css'],
})
export class TabOverviewComponent {
  activeTab = 1;
  @Input() course: ICourse | null = null;
  constructor(public courseService: CourseService) {}
}
