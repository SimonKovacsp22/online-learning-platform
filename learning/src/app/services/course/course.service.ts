import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ICourse } from 'src/app/models/course.model';
import { IRating } from 'src/app/models/rating.model';
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

  getTotalLength = (videos: IVideo[], hoursOnly?: boolean) => {
    const initialValue = 0;

    const sum = videos.reduce(
      // @ts-ignore
      (acc, { durationInSeconds }: IVideo) => acc + durationInSeconds,
      initialValue
    );

    const hours = Math.floor(sum / 3600);
    const minutes = Math.floor((sum % 3600) / 60);
    if (hoursOnly) return `${hours} hours`;
    return `${hours} hours and ${minutes} minutes`;
  };

  getMyCourses = (user: IUser) => {
    return this.http.get(environment.rooturl + '/courses/my/' + user.id, {
      observe: 'response',
      withCredentials: true,
    });
  };
}
