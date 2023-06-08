import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dash/dashboard.service';
import { ICategory } from '../models/category.model';
import { faCircleCheck, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICourse } from '../models/course.model';

@Component({
  selector: 'app-teach-manage',
  templateUrl: './teach-manage.component.html',
  styleUrls: [
    './teach-manage.component.css',
    '../../../node_modules/quill/dist/quill.bubble.css',
  ],
})
export class TeachManageComponent implements OnInit {
  // @ts-ignore
  courseForm: FormGroup;
  faCircleCheck = faCircleCheck;
  faAngleDown = faAngleDown;
  categories: ICategory[] = [];
  selectedOption: string = 'Intended students';
  imagePreview: string | null = null;
  courseId: string | null = null;
  course: ICourse | null = null;
  constructor(
    private dashboardService: DashboardService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      title: '',
      subtitle: '',
    });
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId != null) {
      this.courseService
        .getTaughtCourseById(parseInt(this.courseId))
        .subscribe((data) => {
          const { course } = <any>data.body;
          this.course = course;
          this.courseForm.patchValue({
            title: this.course?.title,
            subtitle: this.course?.subtitle,
          });
        });
    }
    this.dashboardService
      .getCategories()
      .subscribe((data) => (this.categories = <any>data.body));
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onOptionChange(option: string) {
    this.selectedOption = option;
  }
}
