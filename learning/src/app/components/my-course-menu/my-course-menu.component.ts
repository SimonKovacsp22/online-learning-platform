import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-course-menu',
  templateUrl: './my-course-menu.component.html',
  styleUrls: ['./my-course-menu.component.css'],
  standalone: true,
  imports: [NgbAccordionModule],
})
export class MyCourseMenuComponent {}
