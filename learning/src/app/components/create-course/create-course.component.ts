import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../models/category.model';
import { DashboardService } from '../../services/dash/dashboard.service';
import { CourseService } from '../../services/course/course.service';
import { ICourse } from '../../models/course.model';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  categoryForm: FormGroup;
  faAngleDown = faAngleDown;
  step: number | null = 1;
  title: string = 'Step 1 of 3';
  progress: number = 0;
  validSteps: number[] = [1, 2, 3];
  categories: ICategory[] = [];
  workOptions: string[] = [
    `I'm very busy right now (0-2hours)`,
    `I'll work on this on the side (2-4hours)`,
    `I have lots of flexibility (5+hours)`,
    `I haven't decided if I have time`,
  ];
  isLoading: boolean = false;
  courseTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private courseService: CourseService,
    private formBuilder: FormBuilder
  ) {
    this.step = +this.route.snapshot.paramMap.get('step')!;

    if (this.step && !this.validSteps.includes(this.step)) {
      this.router.navigateByUrl('/create/1');
    }
    if (this.step && this.validSteps.includes(this.step)) {
      this.title = `Step ${this.step} of 3`;
      this.progress = this.step * 33.3333;
    }

    this.categoryForm = this.formBuilder.group({
      categoryId: 0,
    });
  }
  ngOnInit(): void {
    this.dashboardService.getCategories().subscribe((data) => {
      this.categories = <any>data.body;
      this.categoryForm.patchValue({
        categoryId: this.categories[0].id,
      });
    });
  }

  createNewCourse() {
    const categoryId = this.categoryForm.get('categoryId')?.value;
    if (categoryId && this.courseTitle.length >= 15) {
      this.isLoading = true;
      this.courseService
        .createCourse(this.courseTitle, categoryId)
        .subscribe((data) => {
          const { course } = <{ course: ICourse }>data.body;
          if (course.id) {
            this.isLoading = false;
            this.router.navigateByUrl(
              '/teach/manage/' + course.id + '/option/basic'
            );
          }
        });
    }
  }

  next(courseForm: NgForm) {
    if (this.step === 1 && this.courseTitle.length < 15) {
      const control = courseForm.control.get('courseTitle');
      control?.markAsTouched();
      return;
    }
    if (this.step && this.step < 3) {
      this.step += 1;
      this.progress = this.step * 33.3333;
      this.title = `Step ${this.step} of 3`;
      this.router.navigate(['/create', this.step]);
    }
  }

  prev() {
    if (this.step === 1) {
      this.router.navigateByUrl('/teach');
      return;
    }
    if (this.step && this.step > 1) {
      this.step -= 1;
      this.progress = this.step * 33.3333;
      this.title = `Step ${this.step} of 3`;
      this.router.navigate(['/create', this.step]);
    }
  }

  selectOption(option: string) {
    const radioButton = document.getElementById(option) as HTMLInputElement;
    if (radioButton) {
      radioButton.checked = true;
    }
  }
}
