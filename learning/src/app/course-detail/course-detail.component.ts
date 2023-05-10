import { Component } from '@angular/core';
import { DashboardService } from '../services/dash/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../models/course.model';
import {
  faCircleExclamation,
  faGlobe,
  faClosedCaptioning,
  faCheck,
  faClapperboard,
  faStar,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent {
  courseId = 0;
  course: ICourse | null = null;
  faCircleExclamation = faCircleExclamation;
  faGlobe = faGlobe;
  faClosedCaptioning = faClosedCaptioning;
  faCheck = faCheck;
  faClapperboard = faClapperboard;
  faStar = faStar;
  faEllipsisVertical = faEllipsisVertical;
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.courseId = parseInt(params['id']);

      this.dashboardService
        .getCourseById(this.courseId)
        .subscribe((responseData) => {
          this.course = <any>responseData.body;
          console.log(this.course);
        });
    });
  }

  getRatingArray = (rating: number) => {
    const ratingUp = Math.ceil(rating);
    return new Array(ratingUp).fill(1);
  };
}
