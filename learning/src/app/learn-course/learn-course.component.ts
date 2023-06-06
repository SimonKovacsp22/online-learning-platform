import { Component, OnInit } from '@angular/core';

import { ICourse } from '../models/course.model';
import { LoginService } from '../services/login/login.service';
import { CourseService } from '../services/course/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learn-course',
  templateUrl: './learn-course.component.html',
  styleUrls: ['./learn-course.component.css'],
})
export class LearnCourseComponent implements OnInit {
  selectedVideo: string =
    'https://firebasestorage.googleapis.com/v0/b/clips-c6f16.appspot.com/o/clips%2F3720618b-01cd-4cc4-8073-2d7359b0dd0e.mp4?alt=media&token=821e9ff3-7a46-44e6-8a3a-fcfeca3f977c&_gl=1*hi2mce*_ga*MTY0NDk4NzM3NS4xNjc1NTI0NjA3*_ga_CW55HF8NVT*MTY4NTU0NDU2OS41OC4xLjE2ODU1NDQ1ODMuMC4wLjA.';
  course: ICourse | null = null;
  courseId: number = 0;

  constructor(
    private loginService: LoginService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.courseId = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.courseService
      .getMyCourseById(this.courseId)
      .subscribe((responseData) => {
        const { course } = <{ course: ICourse }>responseData.body;
        this.course = course;
        this.selectedVideo = course.sections[0].videos[0].sourceUrl;
      });
  }
}
