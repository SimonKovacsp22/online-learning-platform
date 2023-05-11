import { Injectable } from '@angular/core';
import { IRating } from 'src/app/models/rating.model';
import { IVideo } from 'src/app/models/video.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor() {}

  getRatingArray = (rating: number) => {
    const ratingUp = Math.ceil(rating);
    return new Array(ratingUp).fill(1);
  };

  getTotalRating = (ratings: IRating[]) => {
    const initialValue = 0;
    // @ts-ignore
    const sum = ratings.reduce(
      (acc, { amount }: IRating) => acc + amount,
      initialValue
    );
    const average = Math.ceil(sum / ratings.length);
    return average;
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
}
