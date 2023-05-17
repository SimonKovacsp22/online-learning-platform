import { Component, Input } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { faStar, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IRating } from '../models/rating.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  faEllipsisVertical = faEllipsisVertical;
  faStar = faStar;
  constructor(public courseService: CourseService) {}
  @Input() rating: IRating | null = null;
}
