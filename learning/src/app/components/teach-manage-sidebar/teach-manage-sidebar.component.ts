import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ICourse } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-teach-manage-sidebar',
  templateUrl: './teach-manage-sidebar.component.html',
  styleUrls: [
    './teach-manage-sidebar.component.css',
    '../teach-manage/teach-manage.component.css',
  ],
})
export class TeachManageSidebarComponent {
  selectedOption: string = 'basic';
  faCircleCheck = faCircleCheck;
  courseId: number | null = null;
  @Input() course!: ICourse | null;
  @Output() onUpdateStart = new EventEmitter<void>();
  @Output() onUpdateFinish = new EventEmitter<ICourse>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.route.params.subscribe((params) => {
      const optionId = params['optionId'];
      if (optionId) {
        this.selectedOption = optionId;
      }
      const courseId = params['id'];
      if (courseId) {
        this.courseId = courseId;
      }
    });
  }
  onOptionChange(optionId: string) {
    const courseId = this.route.snapshot.paramMap.get('id');

    this.router.navigate(['/teach/manage', courseId, 'option', optionId]);
  }

  publishCourse() {
    const courseId = this.course?.id;
    if (courseId) {
      this.onUpdateStart.emit();
      this.courseService.publishCourse(courseId).subscribe(
        (data) => {
          const { course } = <any>data.body;
          if (course) {
            this.onUpdateFinish.emit(course);
          } else {
            this.onUpdateFinish.emit(undefined);
          }
        },
        (error) => {
          this.onUpdateFinish.emit(undefined);
        }
      );
    }
  }
}
