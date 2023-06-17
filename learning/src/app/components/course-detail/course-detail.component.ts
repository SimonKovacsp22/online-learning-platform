import { Component, HostListener } from '@angular/core';
import { DashboardService } from '../../services/dash/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../models/course.model';
import {
  faCircleExclamation,
  faGlobe,
  faClosedCaptioning,
  faCheck,
  faClapperboard,
  faStar,
  faEllipsisVertical,
  faInfinity,
  faAward,
  faMobileScreen,
  faTv,
} from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../../services/course/course.service';
import { CartService } from '../../services/cart/cart.service';
import { LoginService } from '../../services/login/login.service';
import { OrderItem } from 'src/app/models/order-item.mode';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent {
  courseId = 0;
  isScrolled = false;
  course: ICourse | null = null;
  totalRating = 0;
  faCircleExclamation = faCircleExclamation;
  faGlobe = faGlobe;
  faClosedCaptioning = faClosedCaptioning;
  faCheck = faCheck;
  faClapperboard = faClapperboard;
  faStar = faStar;
  faEllipsisVertical = faEllipsisVertical;
  faInfinity = faInfinity;
  faAward = faAward;
  faMobileScreen = faMobileScreen;
  faTv = faTv;
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    public courseService: CourseService,
    public cartService: CartService,
    public loginService: LoginService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.courseId = parseInt(params['id']);

      this.dashboardService
        .getCourseById(this.courseId)
        .subscribe((responseData) => {
          this.course = <any>responseData.body;
          if (this.course != null) {
            this.totalRating = this.courseService.getTotalRating(
              this.course.ratings
            );
          }
        });
    });
  }

  @HostListener('window:scroll', [])
  onScroll = () => {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollPosition > 300;
  };

  addCourseToCart(course: ICourse) {
    this.cartService
      .addCourseToCart(this.loginService.user, course)
      .subscribe((responseData) => {
        if (<any>responseData.status === 200) {
          this.cartService.cart?.courses.push(course);
        }
      });
  }

  buyNow() {
    if (this.course) {
      let orderItem: OrderItem = new OrderItem(this.course);
      this.cartService
        .createPaymentIntent({
          orderItems: [orderItem],
          currency: 'EUR',
          receiptEmail: this.loginService.user.email,
        })
        .subscribe((responseData) => {
          this.router.navigateByUrl(
            '/checkout?client_secret=' + responseData.client_secret
          );
        });
    }
  }
}
