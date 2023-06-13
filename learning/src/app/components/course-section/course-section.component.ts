import { Component, Input } from '@angular/core';
import { ISection } from '../../models/section.model';
import { CourseService } from '../../services/course/course.service';
import { faAngleDown, faClapperboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.css'],
})
export class CourseSectionComponent {
  isVideosVisible = false;
  faAngleDown = faAngleDown;
  faClapperboard = faClapperboard;
  constructor(public courseService: CourseService) {}
  @Input() section: ISection | null = null;

  toggleVideosVisible = () => (this.isVideosVisible = !this.isVideosVisible);
}
