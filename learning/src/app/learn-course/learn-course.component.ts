import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-course',
  templateUrl: './learn-course.component.html',
  styleUrls: ['./learn-course.component.css'],
})
export class LearnCourseComponent {
  selectedVideo: string =
    'https://firebasestorage.googleapis.com/v0/b/clips-c6f16.appspot.com/o/clips%2F3720618b-01cd-4cc4-8073-2d7359b0dd0e.mp4?alt=media&token=821e9ff3-7a46-44e6-8a3a-fcfeca3f977c&_gl=1*hi2mce*_ga*MTY0NDk4NzM3NS4xNjc1NTI0NjA3*_ga_CW55HF8NVT*MTY4NTU0NDU2OS41OC4xLjE2ODU1NDQ1ODMuMC4wLjA.';
}
