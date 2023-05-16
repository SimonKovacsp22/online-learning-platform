import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { LoginService } from '../services/login/login.service';
import { IProgress } from '../models/progress.model';
import { ICourse } from '../models/course.model';

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

  ngOnInit() {}

  getProgressForCourse(course: ICourse) {
    return this.courseService.getProgress(
      this.loginService.user.progresses,
      course
    );
  }
}
