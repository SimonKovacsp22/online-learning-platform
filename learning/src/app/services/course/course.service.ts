import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ICourse } from 'src/app/models/course.model';
import { ILanguage } from 'src/app/models/language.model';
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
    if (rating === 0) return [];
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
    if (sum === 0) return 0;
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
    return this.http.get<getCoursesResponse>(
      environment.rooturl + '/courses/my/' + user.id,
      {
        observe: 'response',
        withCredentials: true,
      }
    );
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
  getTaughtCourseById = (courseId: number) => {
    return this.http.get(
      environment.rooturl + '/courses/teach/course/' + courseId,
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

  getCoursesForInstructor = (user: IUser) => {
    return this.http.get<getCoursesResponse>(
      environment.rooturl + '/courses/teach',
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  };

  createCourse = (title: string, categoryId: number) => {
    return this.http.post<postOrPutCourseResponse>(
      environment.rooturl + '/courses/draft',
      {
        title,
        categoryId,
      },
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  };
  publishCourse = (courseId: number) => {
    return this.http.post<postOrPutCourseResponse>(
      environment.rooturl + '/courses/publish/' + courseId,
      {},
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  };

  getLanguages = () => {
    return this.http.get<getlanguageResponse>(
      environment.rooturl + '/courses/languages',
      {
        observe: 'response',
      }
    );
  };
  searchCoursesPaginate(page: number, size: number, searchTerm: string) {
    const searchUrl =
      `${environment.rooturl}/courses/search?title=${searchTerm}&` +
      `page=${page}&size=${size}`;
    return this.http.get<getPaginationResponse>(searchUrl);
  }

  getVideoLength(lengthInSeconds: number) {
    const minutes = Math.floor(lengthInSeconds / 60);
    return `${minutes}min`;
  }

  updateCourseBasic(formData: FormData, courseId: number) {
    return this.http.put<postOrPutCourseResponse>(
      `${environment.rooturl}/courses/update/basic/${courseId}`,
      formData,
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }
  updateCoursePrice(price: number, courseId: number) {
    return this.http.put<postOrPutCourseResponse>(
      `${environment.rooturl}/courses/update/price/${courseId}`,
      {
        price,
      },
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }
  updateCourseLearners(sentences: string[], courseId: number) {
    return this.http.put<postOrPutCourseResponse>(
      `${environment.rooturl}/courses/update/learning/${courseId}`,
      {
        sentences,
      },
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  saveOrUpdateSection(
    title: string,
    rank: number,
    sectionId: number | null,
    courseId: number
  ) {
    return this.http.post<postOrPutCourseResponse>(
      `${environment.rooturl}/courses/update/curriculum/sections/${courseId}`,
      {
        title,
        sectionId,
        rank,
      },
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  deleteSection(sectionId: number | null, courseId: number) {
    return this.http.request<postOrPutCourseResponse>(
      'DELETE',
      `${environment.rooturl}/courses/delete/curriculum/sections/${courseId}`,
      {
        observe: 'response',
        withCredentials: true,
        body: {
          sectionId,
        },
      }
    );
  }

  createLecture(formData: FormData, courseId: number) {
    return this.http.post<postOrPutLectureResponse>(
      `${environment.rooturl}/courses/update/curriculum/lectures/${courseId}`,
      formData,
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  updateLecture(formData: FormData, courseId: number) {
    return this.http.put<postOrPutLectureResponse>(
      `${environment.rooturl}/courses/update/curriculum/lectures/${courseId}`,
      formData,
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  deleteLecture(sectionId: number | null, lectureId: number, courseId: number) {
    return this.http.request<postOrPutLectureResponse>(
      'DELETE',
      `${environment.rooturl}/courses/delete/curriculum/lectures/${courseId}`,
      {
        observe: 'response',
        withCredentials: true,
        body: {
          sectionId,
          lectureId,
        },
      }
    );
  }
}

interface getCoursesResponse {
  courses: ICourse[];
}

interface postOrPutCourseResponse {
  course: ICourse;
}

interface getlanguageResponse {
  languages: ILanguage;
}

interface postOrPutLectureResponse {
  section: ISection;
}

interface getPaginationResponse {
  courses: {
    content: ICourse[];
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
