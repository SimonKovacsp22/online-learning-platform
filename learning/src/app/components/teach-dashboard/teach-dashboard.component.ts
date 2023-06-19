import { Component } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { ICourse } from '../../models/course.model';
import { LoginService } from '../../services/login/login.service';

import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-teach-dashboard',
  templateUrl: './teach-dashboard.component.html',
  styleUrls: ['./teach-dashboard.component.css'],
})
export class TeachDashboardComponent {
  taughtCourses: ICourse[] = [];
  subscription!: Subscription;
  refreshSubject = new BehaviorSubject(undefined);
  faArrow = faArrowRightToBracket;
  isLoading: boolean = false;

  constructor(
    private courseService: CourseService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.isLoading = true;
    this.subscription = this.refreshSubject
      .pipe(
        switchMap(() =>
          courseService.getCoursesForInstructor(this.loginService.user)
        )
      )
      .subscribe((data) => {
        const { courses } = <{ courses: any[] }>data.body;
        this.taughtCourses = courses;
        this.isLoading = false;
      });
  }

  private refresh() {
    this.refreshSubject.next(undefined);
  }

  createNewCourse() {
    this.router.navigateByUrl('/create/1');
  }
  // this.courseService.createCourse('Test', 5).subscribe((data) => {
  //   console.log(data);
  //   this.refresh();
  // });
}
