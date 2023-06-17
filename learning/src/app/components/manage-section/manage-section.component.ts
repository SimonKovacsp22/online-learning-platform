import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISection } from '../../models/section.model';
import {
  faFile,
  faPlus,
  faCircleCheck,
  faPen,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.css'],
})
export class ManageSectionComponent implements OnInit {
  sectionForm: FormGroup;
  lectureForm: FormGroup;
  @Input() section!: ISection;
  @Output() onSaveSection = new EventEmitter<ISection[]>();
  @Output() onSaveLecture = new EventEmitter<ISection>();
  @Output() onUpdate = new EventEmitter<boolean>();

  faFile = faFile;
  faPlusN = faPlus;
  faCheck = faCircleCheck;
  faPen = faPen;
  faTrash = faTrash;
  faXmark = faXmark;
  isLoading: boolean = false;

  isUpdatingSection: boolean = false;
  isAddingLecture: boolean = false;
  modalCloseResult = '';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.sectionForm = this.formBuilder.group({
      title: '',
      rank: 0,
    });
    this.lectureForm = this.formBuilder.group({
      title: '',
      rank: 0,
      duration: 0,
      file: null,
    });
  }

  ngOnInit(): void {
    this.sectionForm.patchValue({
      title: this.section.title,
      rank: this.section.rank,
    });

    this.section.videos.sort((a, b) => a.rank - b.rank);
  }

  updateSection() {
    if (this.isUpdatingSection) return;
    this.isUpdatingSection = true;
    // this.onSave.emit([]);
  }

  deleteSection() {}

  saveSection() {
    const title = this.sectionForm.get('title')?.value;
    const rank = this.sectionForm.get('rank')?.value;
    const courseId = this.route.snapshot.paramMap.get('id');

    if (title && rank && courseId) {
      this.onUpdate.emit(true);
      this.courseService
        .saveOrUpdateSection(
          title,
          rank,
          this.section.id as number,
          parseInt(courseId)
        )
        .subscribe((data) => {
          const { course } = <any>data.body;
          if (course != null) {
            this.onSaveSection.emit(course.sections);
            this.onUpdate.emit(false);
            this.isUpdatingSection = false;
          }
        });
    }
  }

  cancelUpdate() {
    this.isUpdatingSection = false;
  }

  deleteModalOpen(content: any, sectionId: number | undefined) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        if (result === 'OK' && this.section.videos.length === 0) {
          const courseId = this.route.snapshot.paramMap.get('id');
          if (courseId && sectionId) {
            this.courseService
              .deleteSection(sectionId, parseInt(courseId))
              .subscribe((data) => {
                const { course } = <any>data.body;
                this.onSaveSection.emit(course.sections);
              });
          }
        }
      });
  }

  addLectureTemplate() {
    if (this.isAddingLecture) return;
    this.isAddingLecture = true;
  }

  cancelNewLectureTemplate() {
    if (!this.isAddingLecture) return;
    this.isAddingLecture = false;
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.lectureForm.get('file')?.setValue(file);
  }

  saveNewLecture(sectionId: number | undefined) {
    const title = this.lectureForm.get('title')?.value;
    const rank = this.lectureForm.get('rank')?.value;
    const duration = this.lectureForm.get('duration')?.value;
    const courseId = this.route.snapshot.paramMap.get('id');
    const file: File = this.lectureForm.get('file')?.value;

    if (this.lectureForm.valid && courseId && sectionId) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('rank', rank);
      formData.append('duration', duration);
      formData.append('file', file);
      formData.append('sectionId', sectionId.toString());
      this.onUpdate.emit(true);
      this.isLoading = true;
      this.courseService
        .createLecture(formData, parseInt(courseId))
        .subscribe((data) => {
          const { section } = <any>data.body;
          if (section != null) {
            this.onSaveLecture.emit(section);
            this.onUpdate.emit(false);
            this.isLoading = false;
            this.cancelUpdate();
          }
        });
    }
  }

  handleLectureUpdateSave(section: ISection) {
    this.onUpdate.emit(false);
    this.onSaveLecture.emit(section);
  }
  handleLectureUpdateStart() {
    this.onUpdate.emit(true);
  }
}
