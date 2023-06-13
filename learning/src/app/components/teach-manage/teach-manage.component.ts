import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dash/dashboard.service';
import { ICategory } from '../../models/category.model';
import {
  faAngleDown,
  faPlusCircle,
  faArrowRightToBracket,
  faFile,
  faPlus,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICourse } from '../../models/course.model';
import { ILanguage } from '../../models/language.model';
import { IWYWL, WYWL } from '../../models/wywl.model';
import { environment } from '../../environments/environment';
import { ISection, Section } from 'src/app/models/section.model';

@Component({
  selector: 'app-teach-manage',
  templateUrl: './teach-manage.component.html',
  styleUrls: [
    './teach-manage.component.css',
    '../../../../node_modules/quill/dist/quill.bubble.css',
  ],
})
export class TeachManageComponent implements OnInit {
  courseForm: FormGroup;
  learnersForm: FormGroup;
  priceForm: FormGroup;
  curriculumForm: FormGroup;
  initialImage: string =
    'https://s.udemycdn.com/course/750x422/placeholder.jpg';
  faAngleDown = faAngleDown;
  faPlus = faPlusCircle;
  faPlusN = faPlus;
  faArrow = faArrowRightToBracket;
  faFile = faFile;
  faCheck = faCircleCheck;
  categories: ICategory[] = [];
  imagePreview: string | null = null;
  courseId: string | null = null;
  course: ICourse | null = null;
  languages: ILanguage[] = [];
  sections: ISection[] = [];
  whatYouWillLearn: IWYWL[] = [];
  option: string | null = 'basic';
  successMessage: string = 'Changes Saved Succefully.';
  isAlertVisible: boolean = false;
  timeoutId: any = null;
  isLoading: boolean = false;
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
    this.priceForm = this.formBuilder.group({
      price: 0,
    });
    this.curriculumForm = this.formBuilder.group({});
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
          this.updatePriceFrom();
          this.setImagePreview();
          this.generateWhatYouWillLearnForm(course);
          this.generateCurriculumForm(course.sections);
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
  generateCurriculumForm(sections: ISection[] | null) {
    if (sections != null && sections.length > 0) {
      this.sections = sections;
    } else {
      this.sections.push(new Section('Section 1', 1));
    }
    this.sections.forEach((input, idx) => {
      this.curriculumForm.addControl(
        'section' + idx,
        new FormControl(input.title)
      );
    });
  }
  private updatePriceFrom() {
    if (this.course && this.course?.price) {
      this.priceForm.patchValue({
        price: this.course.price,
      });
    }
  }

  private setImagePreview() {
    if (this.course?.imageUrl) {
      this.initialImage = this.course.imageUrl;
    }
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
    this.whatYouWillLearn.forEach((input, idx) => {
      this.learnersForm.addControl(
        'input' + idx,
        new FormControl(input.sentence)
      );
    });

    while (this.whatYouWillLearn.length < 4) {
      this.whatYouWillLearn.push(
        new WYWL('', null, this.getPlaceholderSentence())
      );
    }
    this.whatYouWillLearn.forEach((input, idx) => {
      this.learnersForm.addControl('input' + idx, new FormControl(''));
      const key = 'input' + idx;
    });
  }

  addMoreWYWL() {
    if (this.whatYouWillLearn.length >= 10) return;
    this.whatYouWillLearn.push(
      new WYWL('', null, this.getPlaceholderSentence())
    );
    const key = 'input' + (this.whatYouWillLearn.length - 1);
    this.learnersForm.addControl(key, new FormControl(''));
  }

  updateCourse() {
    switch (this.option) {
      case 'basic':
        this.isLoading = true;
        const formData = new FormData();
        formData.append('title', this.courseForm.get('title')?.value);
        formData.append('subtitle', this.courseForm.get('subtitle')?.value);
        formData.append('description', '');
        formData.append('file', this.courseForm.get('file')?.value);
        if (this.courseId != null)
          this.courseService
            .updateCourseBasic(formData, parseInt(this.courseId))
            .subscribe((data) => {
              const { course } = <any>data.body;
              this.course = course;
              this.updateBasicForm();
              this.isLoading = false;
              this.showAlert();
            });
        break;
      case 'pricing':
        this.isLoading = true;
        const price = this.priceForm.get('price')?.value;
        if (this.courseId != null) {
          this.courseService
            .updateCoursePrice(price, parseInt(this.courseId))
            .subscribe((data) => {
              const { course } = <any>data.body;
              this.course = course;
              this.updateBasicForm();
              this.isLoading = false;
              this.showAlert();
            });
        }
        break;
      case 'students':
        this.isLoading = true;
        const sentences: string[] = [];
        Object.values(this.learnersForm.controls).forEach((control) =>
          sentences.push(control.value)
        );
        console.log(sentences);
        if (this.courseId != null) {
          this.courseService
            .updateCourseLearners(sentences, parseInt(this.courseId))
            .subscribe((data) => {
              const { course } = <any>data.body;
              this.course = course;
              this.updateBasicForm();
              this.isLoading = false;
              this.showAlert();
            });
        }
    }
  }
  private showAlert() {
    this.isAlertVisible = true;
    this.timeoutId = setTimeout(() => {
      if (this.isAlertVisible) {
        this.isAlertVisible = false;
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
      }
    }, 2500);
  }

  handleCloseAlert(event: boolean) {
    this.isAlertVisible = event;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  getPlaceholderSentence() {
    const sentences = environment.sentences;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  }
}
