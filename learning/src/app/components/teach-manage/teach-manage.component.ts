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
  faPen,
  faTrash,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICourse } from '../../models/course.model';
import { ILanguage } from '../../models/language.model';
import { IWYWL, WYWL } from '../../models/wywl.model';
import { environment } from '../../environments/environment';
import { ISection } from 'src/app/models/section.model';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { DomSanitizer } from '@angular/platform-browser';

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
  faTrash = faTrash;
  faPen = faPen;
  faBan = faBan;
  categories: ICategory[] = [];
  imagePreview: string | null = null;
  courseId: string | null = null;
  course: ICourse | null = null;
  languages: ILanguage[] = [];
  sections: ISection[] = [];
  whatYouWillLearn: IWYWL[] = [];
  option: string | null = 'basic';
  successMessage: string = 'Changes Applied Succefully.';
  errorMessage: string = 'Something went wrong!';
  isAlertSuccessVisible: boolean = false;
  isAlertErrorVisible: boolean = false;
  successTimeoutId: any = null;
  errorTimeoutId: any = null;
  isLoading: boolean = false;
  isAddingSection: boolean = false;
  description: string = '';
  timeout: any;
  modules = {};

  constructor(
    private dashboardService: DashboardService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.courseForm = this.formBuilder.group({
      title: '',
      subtitle: '',
      description: '',
      language: 'ENGLISH',
      category: 0,
      file: null,
    });
    this.learnersForm = this.formBuilder.group({});
    this.priceForm = this.formBuilder.group({
      price: 0,
    });
    this.curriculumForm = this.formBuilder.group({
      newSection: '',
      rank: '',
    });

    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button
      ],
    };
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
      this.sections = sections.sort((a, b) => a.rank - b.rank);
    }
    this.sections.forEach((input, idx) => {
      this.curriculumForm.addControl(
        'section' + input.id + 'title',
        new FormControl(input.title)
      );
      this.curriculumForm.addControl(
        'section' + input.id + 'rank',
        new FormControl(input.rank)
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
      subtitle: this.course?.subtitle != null ? this.course?.subtitle : '',
      language:
        this.course?.languages[0] && this.course.languages.length > 0
          ? this.course?.languages[0].name
          : 'ENGLISH',
      category:
        this.course?.categories[0].id != null
          ? this.course?.categories[0].id
          : 0,
      description: this.course?.description,
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

  handleDescriptionChange(event: EditorChangeContent | EditorChangeSelection) {}

  handleContentChange(event: any) {
    clearTimeout(this.timeout); // Clear any existing timeout

    this.timeout = setTimeout(() => {
      this.description = event.html;
    }, 500); // Set the delay to 0.5 seconds (500 milliseconds)
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
        const formData = new FormData();
        formData.append('title', this.courseForm.get('title')?.value);
        formData.append('subtitle', this.courseForm.get('subtitle')?.value);
        formData.append('description', this.description);
        formData.append('file', this.courseForm.get('file')?.value);
        formData.append('categoryId', this.courseForm.get('category')?.value);
        formData.append('language', this.courseForm.get('language')?.value);
        formData.append('categoryId', this.courseForm.get('category')?.value);
        if (this.courseId != null) {
          this.isLoading = true;
          this.courseService
            .updateCourseBasic(formData, parseInt(this.courseId))
            .subscribe((data) => {
              const { course } = <any>data.body;
              this.course = course;
              this.updateBasicForm();
              this.isLoading = false;
              this.showSuccessAlert();
            });
        }

        break;
      case 'pricing':
        const price = this.priceForm.get('price')?.value;
        if (this.courseId != null) {
          this.isLoading = true;
          this.courseService
            .updateCoursePrice(price, parseInt(this.courseId))
            .subscribe((data) => {
              const { course } = <any>data.body;
              this.course = course;
              this.updateBasicForm();
              this.showSuccessAlert();
              this.isLoading = false;
            });
        }
        break;
      case 'students':
        const sentences: string[] = [];
        Object.values(this.learnersForm.controls).forEach((control) =>
          sentences.push(control.value)
        );
        if (this.courseId != null) {
          this.isLoading = true;
          this.courseService
            .updateCourseLearners(sentences, parseInt(this.courseId))
            .subscribe((data) => {
              const { course } = <any>data.body;
              this.course = course;
              this.updateBasicForm();
              this.isLoading = false;
              this.showSuccessAlert();
            });
        }
        break;
    }
  }
  private showSuccessAlert() {
    this.isAlertSuccessVisible = true;
    this.successTimeoutId = setTimeout(() => {
      if (this.isAlertSuccessVisible) {
        this.isAlertSuccessVisible = false;
        if (this.successTimeoutId) {
          clearTimeout(this.successTimeoutId);
        }
      }
    }, 2500);
  }

  private showErrorAlert() {
    this.isAlertErrorVisible = true;
    this.errorTimeoutId = setTimeout(() => {
      if (this.isAlertErrorVisible) {
        this.isAlertErrorVisible = false;
        if (this.errorTimeoutId) {
          clearTimeout(this.errorTimeoutId);
        }
      }
    }, 2500);
  }
  handleCloseSuccessAlert(event: boolean) {
    this.isAlertSuccessVisible = event;
    if (this.successTimeoutId) {
      clearTimeout(this.successTimeoutId);
    }
  }
  handleCloseErrorAlert(event: boolean) {
    this.isAlertErrorVisible = event;
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
    }
  }

  getPlaceholderSentence() {
    const sentences = environment.sentences;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  }

  addSectionTemplate() {
    if (this.isAddingSection) return;
    this.isAddingSection = true;
  }

  cancelNewSectionTemplate() {
    if (!this.isAddingSection) return;
    this.isAddingSection = false;
  }

  saveNewSection(sectionId: number | null) {
    const title = this.curriculumForm.get('newSection')?.value;
    const rank = this.curriculumForm.get('rank')?.value;

    if (this.courseId && title) {
      this.isLoading = true;
      this.courseService
        .saveOrUpdateSection(title, rank, null, parseInt(this.courseId))
        .subscribe((data) => {
          const { course } = <any>data.body;
          if (this.course) {
            this.course.sections = course.sections;
            this.sections = course.sections.sort(
              (a: ISection, b: ISection) => a.rank - b.rank
            );
            this.generateCurriculumForm(this.sections);
          }
          this.showSuccessAlert();
          this.isLoading = false;
        });
    }
    this.isAddingSection = false;
  }

  handleSectionUpdate(sections: ISection[]) {
    this.showSuccessAlert();
    this.sections = sections.sort((a, b) => a.rank - b.rank);
  }

  handleLectureCreate(section: ISection) {
    this.showSuccessAlert();
    const idx = this.sections.findIndex((s) => s.id == section.id);
    if (idx !== -1) {
      this.sections[idx] = section;
    }
  }

  handleIsUpdating(isUpdating: boolean) {
    this.isLoading = isUpdating;
  }

  handleCoursePublishUpdateStart() {
    this.isLoading = true;
  }
  handleCoursePublishUpdateFinish(course: ICourse) {
    if (!course) {
      this.isLoading = false;
      this.showErrorAlert();
      return;
    }
    if (this.course) {
      this.course.draft = course.draft;
      this.isLoading = false;
      this.showSuccessAlert();
    }
  }
}
