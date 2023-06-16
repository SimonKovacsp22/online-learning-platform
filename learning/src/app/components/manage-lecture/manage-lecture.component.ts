import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVideo } from '../../models/video.model';
import {
  faCheck,
  faFile,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { ISection } from 'src/app/models/section.model';

@Component({
  selector: 'app-manage-lecture',
  templateUrl: './manage-lecture.component.html',
  styleUrls: ['./manage-lecture.component.css'],
})
export class ManageLectureComponent implements OnInit {
  lectureForm: FormGroup;
  @Output() onSaveLectureSuccess = new EventEmitter<ISection>();
  @Output() onUpdateStart = new EventEmitter<void>();
  @Input() sectionId!: number | undefined;
  @Input() lecture!: IVideo;
  isLectureHovered: boolean = false;
  faCheck = faCheck;
  faFile = faFile;
  faPen = faPen;
  faTrash = faTrash;
  isLectureTemplateVisible: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.lectureForm = this.formBuilder.group({
      title: '',
      duration: 0,
      rank: 0,
      file: null,
    });
  }
  ngOnInit(): void {
    this.lectureForm.patchValue({
      title: this.lecture.title,
      duration: this.lecture.durationInSeconds,
      rank: this.lecture.rank,
    });
  }

  onLectureHover() {
    this.isLectureHovered = true;
  }
  onLectureLeave() {
    this.isLectureHovered = false;
  }

  setLectureTemplateVisible() {
    this.isLectureTemplateVisible = true;
  }

  setLectureTemplateNotVisible() {
    this.isLectureTemplateVisible = false;
  }

  updateLecture() {
    this.isLoading = true;
    const title = this.lectureForm.get('title')?.value;
    const rank = this.lectureForm.get('rank')?.value;
    const duration = this.lectureForm.get('duration')?.value;
    const file = this.lectureForm.get('file')?.value;
    const lectureId = this.lecture.id;
    const sectionId = this.sectionId;
    const courseId = this.route.snapshot.paramMap.get('id');
    if (this.lectureForm.valid && lectureId && sectionId && courseId) {
      this.onUpdateStart.emit();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('duration', duration);
      formData.append('rank', rank);
      formData.append('file', file);
      formData.append('lectureId', lectureId.toString());
      formData.append('sectionId', sectionId.toString());

      this.courseService
        .updateLecture(formData, parseInt(courseId))
        .subscribe((data) => {
          const { section } = <any>data.body;
          this.onSaveLectureSuccess.emit(section);
          this.isLoading = false;
        });
    }
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.lectureForm.get('file')?.setValue(file);
  }
}
