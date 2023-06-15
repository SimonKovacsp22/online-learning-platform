import { Component, Input } from '@angular/core';
import { IVideo } from '../models/video.model';
import {
  faCheck,
  faFile,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-lecture',
  templateUrl: './manage-lecture.component.html',
  styleUrls: ['./manage-lecture.component.css'],
})
export class ManageLectureComponent {
  @Input() video!: IVideo;
  isLectureHovered: boolean = false;
  faCheck = faCheck;
  faFile = faFile;
  faPen = faPen;
  faTrash = faTrash;
  isUpdating: boolean = false;

  updateLecture() {
    if (this.isUpdating) return;
    this.isUpdating = true;
  }
  cancelUpdate() {
    this.isUpdating = false;
  }
  onLectureHover() {
    this.isLectureHovered = true;
  }
  onLectureLeave() {
    this.isLectureHovered = false;
  }
}
