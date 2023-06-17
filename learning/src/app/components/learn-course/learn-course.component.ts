import { Component, OnInit, ViewChild } from '@angular/core';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { ICourse } from '../../models/course.model';
import { LoginService } from '../../services/login/login.service';
import { CourseService } from '../../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { ISection } from 'src/app/models/section.model';

@Component({
  selector: 'app-learn-course',
  templateUrl: './learn-course.component.html',
  styleUrls: ['./learn-course.component.css'],
})
export class LearnCourseComponent implements OnInit {
  @ViewChild(VideoPlayerComponent) videoPlayer!: VideoPlayerComponent;
  course: ICourse | null = null;
  courseId: number = 0;
  faClapperboard = faClapperboard;
  sortedSections: ISection[] = [];
  selectedVideoSources: { src: string; type: string }[] = [];
  previouslySelectedLectureId: number | null = null;

  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.courseId = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.courseService
      .getMyCourseById(this.courseId)
      .subscribe((responseData) => {
        const { course } = <{ course: ICourse }>responseData.body;
        this.course = course;
        this.selectedVideoSources = [
          { src: course.sections[0].videos[0].sourceUrl, type: 'video/mp4' },
        ];
        this.sortSections(course.sections);
      });
  }

  onVideoSelect(sourceUrl: string, lectureId: number) {
    if (this.previouslySelectedLectureId !== lectureId) {
      const newSource = { src: sourceUrl, type: 'video/mp4' };

      // Update the selectedVideoSources array
      this.selectedVideoSources = [newSource];

      this.videoPlayer.updateVideoSource(this.selectedVideoSources);
      this.previouslySelectedLectureId = lectureId;
    }
  }

  sortSections(sections: ISection[]) {
    const sortedSections = sections.map((sec) => ({
      ...sec,
      videos: sec.videos.slice().sort((a, b) => a.rank - b.rank),
    }));

    sortedSections.sort((a, b) => a.rank - b.rank);
    this.sortedSections = sortedSections;
  }
}
