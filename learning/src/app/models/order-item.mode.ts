import { ICourse } from './course.model';

export class OrderItem {
  imageUrl: string;
  price: number;
  courseId: number;

  constructor(course: ICourse) {
    this.imageUrl = course.imageUrl;
    this.price = course.price;
    this.courseId = course.id;
  }
}
