import { Component, Input } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { ICourse } from '../../models/course.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-template',
  templateUrl: './course-template.component.html',
  styleUrls: ['./course-template.component.css'],
})
export class CourseTemplateComponent {
  faStar = faStar;
  totalRating: number = 0;

  constructor(public courseService: CourseService, private router: Router) {}
  @Input() course: ICourse | null = null;
  ngOnInit() {
    if (this.course) {
      this.totalRating = this.courseService.getTotalRating(this.course.ratings);
    }
  }
}
