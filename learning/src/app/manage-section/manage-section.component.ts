import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISection } from '../models/section.model';
import {
  faFile,
  faPlus,
  faCircleCheck,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.css'],
})
export class ManageSectionComponent implements OnInit {
  sectionForm: FormGroup;
  @Input() section!: ISection;
  @Output() onSave = new EventEmitter<ISection[]>();

  faFile = faFile;
  faPlusN = faPlus;
  faCheck = faCircleCheck;
  faPen = faPen;
  faTrash = faTrash;

  isUpdating: boolean = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.sectionForm = this.formBuilder.group({
      title: '',
      rank: 0,
    });
  }

  ngOnInit(): void {
    this.sectionForm.patchValue({
      title: this.section.title,
      rank: this.section.rank,
    });
  }

  updateSection() {
    if (this.isUpdating) return;
    this.isUpdating = true;
    // this.onSave.emit([]);
  }

  deleteSection() {
    // this.onSave.emit([]);
  }

  saveSection() {
    const title = this.sectionForm.get('title')?.value;
    const rank = this.sectionForm.get('rank')?.value;
    const courseId = this.route.snapshot.paramMap.get('id');
    console.log(title);
    console.log(rank);
    console.log(courseId);
    if (title && rank && courseId) {
      this.courseService
        .saveOrUpdateSection(
          title,
          rank,
          this.section.id as number,
          parseInt(courseId)
        )
        .subscribe((data) => {
          const { course } = <any>data.body;
          this.onSave.emit(course.sections);
          this.isUpdating = false;
        });
    }
  }

  cancelUpdate() {
    this.isUpdating = false;
  }
}
