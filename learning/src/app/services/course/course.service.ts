import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ICourse } from 'src/app/models/course.model';
import { IProgress, Progress } from 'src/app/models/progress.model';
import { IRating } from 'src/app/models/rating.model';
import { ISection } from 'src/app/models/section.model';
import { IUser } from 'src/app/models/user.model';
import { IVideo } from 'src/app/models/video.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  myCourses: ICourse[] | null = null;
  constructor(private http: HttpClient) {}

  getRatingArray = (rating: number) => {
    const ratingUp = Math.ceil(rating);
    return new Array(ratingUp).fill(1);
  };

  getTotalRating = (ratings: IRating[], rounded?: boolean) => {
    const initialValue = 0;
    // @ts-ignore
    const sum = ratings.reduce(
      (acc, { amount }: IRating) => acc + amount,
      initialValue
    );
    const average = sum / ratings.length;

    const averageRounded = Math.ceil(average);

    return rounded ? averageRounded : parseFloat(average.toFixed(1));
  };

  getAvatarInitials = (user: IUser) => {
    return `${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`;
  };

  getFirstNameAndLastNameFirstLetter = (user: IUser) => {
    return `${user.firstName} ${user.lastName.slice(0, 1)}`;
  };

  getFirstNameAndLastNameDevidedBySpace = (user: IUser) => {
    return `${user.firstName} ${user.lastName}`;
  };

  getTotalLength = (
    sections: ISection[],
    hoursOnly?: boolean,
    short?: boolean
  ) => {
    const initialValue = 0;
    let runningSum = 0;
    let total = 0;

    sections.forEach((s) => {
      runningSum = s.videos.reduce(
        // @ts-ignore
        (acc, { durationInSeconds }: IVideo) => acc + durationInSeconds,
        initialValue
      );
      total += runningSum;
      runningSum = 0;
    });

    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    if (hoursOnly) return `${hours} hours`;
    return `${hours}${short ? 'h' : 'hours'} and ${minutes}${
      short ? 'm' : 'minutes'
    }`;
  };

  getSectionLength = (
    videos: IVideo[],
    hoursOnly?: boolean,
    short?: boolean
  ) => {
    const initialValue = 0;

    let total = 0;

    total = videos.reduce(
      // @ts-ignore
      (acc, { durationInSeconds }: IVideo) => acc + durationInSeconds,
      initialValue
    );

    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    if (hoursOnly) return `${hours} hours`;
    return `${hours} ${short ? 'h' : 'hours'} and ${minutes} ${
      short ? 'm' : 'minutes'
    }`;
  };

  getTotalLectures = (sections: ISection[]) => {
    let total = 0;
    sections.forEach((s) => (total += s.videos.length));
    return total;
  };

  getMyCourses = (user: IUser) => {
    return this.http.get(environment.rooturl + '/courses/my/' + user.id, {
      observe: 'response',
      withCredentials: true,
    });
  };

  getMyCourseById = (courseId: number) => {
    return this.http.get(
      environment.rooturl + '/courses/my/course/' + courseId,
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  };

  getProgress = (progresses: IProgress[], course: ICourse) => {
    const courseProgress = progresses.find((p) => p.course === course.id);
    if (courseProgress) return courseProgress.ratio;
    return 0;
  };

  isCourseMine(course: ICourse) {
    return this.myCourses?.findIndex((c) => c.id === course.id) !== -1;
  }

  toCamelCase(word: string) {
    const firstLetter = word.slice(0, 1).toUpperCase();
    const restOfTheWord = word.slice(1, word.length).toLowerCase();
    return firstLetter + restOfTheWord;
  }
}
