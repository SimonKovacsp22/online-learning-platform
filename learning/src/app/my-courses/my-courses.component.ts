import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css'],
})
export class MyCoursesComponent implements OnInit {
  constructor(
    public courseService: CourseService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.getMyCourses();
  }

  getMyCourses() {
    if (this.loginService.user.authStatus !== 'AUTH') return;
    this.courseService
      .getMyCourses(this.loginService.user)
      .subscribe((responseData) => {
        const { courses } = <{ courses: any[] }>responseData.body;
        this.courseService.myCourses = courses;
      });
  }
}
