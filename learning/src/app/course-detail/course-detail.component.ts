import { Component, HostListener } from '@angular/core';
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
  faInfinity,
  faAward,
  faMobileScreen,
  faTv,
} from '@fortawesome/free-solid-svg-icons';
import { IRating } from '../models/rating.model';
import { IVideo } from '../models/video.model';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent {
  courseId = 0;
  isScrolled = false;
  course: ICourse | null = null;
  faCircleExclamation = faCircleExclamation;
  faGlobe = faGlobe;
  faClosedCaptioning = faClosedCaptioning;
  faCheck = faCheck;
  faClapperboard = faClapperboard;
  faStar = faStar;
  faEllipsisVertical = faEllipsisVertical;
  faInfinity = faInfinity;
  faAward = faAward;
  faMobileScreen = faMobileScreen;
  faTv = faTv;
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    public courseService: CourseService
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

  @HostListener('window:scroll', [])
  onScroll = () => {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollPosition > 300;
  };
}
