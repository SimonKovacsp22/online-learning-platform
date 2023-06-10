import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dash/dashboard.service';
import { ICourse } from '../models/course.model';
import { faCircleExclamation, faStar } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../services/course/course.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent {
  faExclemation = faCircleExclamation;
  faStar = faStar;
  categoryId = 0;
  categoryName = '';
  courses: ICourse[] = [];
  orderType = 'popular';

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private loginService: LoginService,
    public courseService: CourseService
  ) {
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['id']);
      this.categoryName = this.route.snapshot.queryParams['name'];
      this.dashboardService
        .getCoursesByCategory(this.categoryId)
        .subscribe((responseData) => {
          this.courses = <any>responseData.body;
        });
    });
  }

  setSelected(type: string) {
    this.orderType = type;
  }
}
