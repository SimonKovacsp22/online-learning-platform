import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { CourseService } from '../services/course/course.service';
import { ICourse } from '../models/course.model';

@Component({
  selector: 'app-my-courses-prew',
  templateUrl: './my-courses-prew.component.html',
  styleUrls: ['./my-courses-prew.component.css'],
})
export class MyCoursesPrewComponent implements OnInit {
  myCoursesPrewVisible = false;
  constructor(
    private router: Router,
    public loginService: LoginService,
    public courseService: CourseService
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

  onMyCoursesHover = () => (this.myCoursesPrewVisible = true);

  onMyCoursesLeave = () => (this.myCoursesPrewVisible = false);

  getProgressForCourse(course: ICourse) {
    return this.courseService.getProgress(
      this.loginService.user.progresses,
      course
    );
  }
}
