import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faClapperboard,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { ICourse } from '../../models/course.model';
import { LoginService } from '../../services/login/login.service';
import { CourseService } from '../../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { ISection } from 'src/app/models/section.model';
import { IVideo } from 'src/app/models/video.model';

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
  faArrow = faArrowRightToBracket;
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
        this.sortedSections = this.sortVideosAndSectionsByRank(
          this.course.sections
        );
        this.selectedVideoSources = [
          { src: course.sections[0].videos[0].sourceUrl, type: 'video/mp4' },
        ];
        this.previouslySelectedLectureId = course.sections[0].videos[0].id;
      });
  }

  onVideoSelect(lecture: IVideo) {
    const selectedLecture = lecture;
    if (selectedLecture.id != this.previouslySelectedLectureId) {
      // Create the new source object
      const newSource = { src: lecture.sourceUrl, type: 'video/mp4' };

      // Update the selectedVideoSources array
      this.selectedVideoSources = [newSource];

      this.videoPlayer.updateVideoSource(this.selectedVideoSources);
    }
    this.previouslySelectedLectureId = selectedLecture.id;
  }

  sortVideosAndSectionsByRank(sections: ISection[]): ISection[] {
    const sectionsWithSortedVideos = sections.map((section) => ({
      ...section,
      videos: section.videos.slice().sort((a, b) => a.rank - b.rank),
    }));

    return sectionsWithSortedVideos.sort((a, b) => a.rank - b.rank);
  }
}
