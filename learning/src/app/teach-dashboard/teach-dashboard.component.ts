import { Component } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { ICourse } from '../models/course.model';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-teach-dashboard',
  templateUrl: './teach-dashboard.component.html',
  styleUrls: ['./teach-dashboard.component.css'],
})
export class TeachDashboardComponent {
  taughtCourses: ICourse[] = [];
  constructor(
    private courseService: CourseService,
    private loginService: LoginService
  ) {
    this.courseService
      .getCoursesForInstructor(this.loginService.user)
      .subscribe((data) => {
        const { courses } = <{ courses: any[] }>data.body;
        this.taughtCourses = courses;
      });
  }

  createNewCourse() {
    this.courseService
      .createCourse('Test', 5)
      .subscribe((data) => console.log(data));
  }
}
