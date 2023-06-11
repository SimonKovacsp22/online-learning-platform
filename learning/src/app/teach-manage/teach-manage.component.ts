import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dash/dashboard.service';
import { ICategory } from '../models/category.model';
import { faAngleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICourse } from '../models/course.model';
import { ILanguage } from '../models/language.model';
import { IWYWL, WYWL } from '../models/wywl.model';

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
  learnersForm: FormGroup;
  initialImage: string =
    'https://s.udemycdn.com/course/750x422/placeholder.jpg';
  faAngleDown = faAngleDown;
  faPlus = faPlusCircle;
  categories: ICategory[] = [];
  imagePreview: string | null = null;
  courseId: string | null = null;
  course: ICourse | null = null;
  languages: ILanguage[] = [];
  whatYouWillLearn: IWYWL[] = [];
  option: string | null = 'basic';
  constructor(
    private dashboardService: DashboardService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      title: '',
      subtitle: '',
      description: '',
      language: 1052,
      category: 0,
      file: null,
    });
    this.learnersForm = this.formBuilder.group({});
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      this.option = params['optionId'];
    });
    if (this.courseId != null) {
      this.courseService
        .getTaughtCourseById(parseInt(this.courseId))
        .subscribe((data) => {
          const { course } = <any>data.body;
          this.course = course;
          if (this.course?.imageUrl) {
            this.initialImage = this.course.imageUrl;
          }
          this.generateWhatYouWillLearnForm(course);
          this.updateBasicForm();
        });
    }
    this.dashboardService
      .getCategories()
      .subscribe((data) => (this.categories = <any>data.body));
    this.courseService.getLanguages().subscribe((data) => {
      const { languages } = <any>data.body;
      this.languages = languages;
    });

    this.courseForm.get('language')?.value;
  }
  private updateBasicForm() {
    this.courseForm.patchValue({
      title: this.course?.title,
      subtitle: this.course?.subtitle,
      language:
        this.course?.languages[0] && this.course.languages.length > 0
          ? this.course?.languages[0].id
          : 1052,
      category:
        this.course?.categories[0].id != null
          ? this.course?.categories[0].id
          : 0,
    });
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.courseForm.get('file')?.setValue(file);

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  generateWhatYouWillLearnForm(course: ICourse) {
    this.whatYouWillLearn = course.whatYouWillLearn;
    if (this.whatYouWillLearn.length >= 4) {
      this.whatYouWillLearn.forEach((input, idx) => {
        this.learnersForm.addControl(
          'input' + idx,
          new FormControl(input.sentence)
        );
      });
    } else {
      while (this.whatYouWillLearn.length !== 4) {
        this.whatYouWillLearn.push(new WYWL('Something', null));
      }
      this.whatYouWillLearn.forEach((input, idx) => {
        this.learnersForm.addControl(
          'input' + idx,
          new FormControl('Something')
        );
        const key = 'input' + idx;
      });
    }
  }

  addMoreWYWL() {
    this.whatYouWillLearn.push(new WYWL('Something', null));
    const key = 'input' + (this.whatYouWillLearn.length - 1);
    this.learnersForm.addControl(key, new FormControl('Something'));
  }

  updateCourse() {
    switch (this.option) {
      case 'basic':
        const formData = new FormData();
        formData.append('title', this.courseForm.get('title')?.value);
        formData.append('subtitle', this.courseForm.get('subtitle')?.value);
        formData.append('description', '');
        formData.append('file', this.courseForm.get('file')?.value);
        if (this.courseId !== null)
          this.courseService
            .updateCourseBasic(formData, parseInt(this.courseId))
            .subscribe((data) => {
              const { course } = <any>data.body;
              this.course = course;
              this.updateBasicForm();
            });
    }
  }
}
