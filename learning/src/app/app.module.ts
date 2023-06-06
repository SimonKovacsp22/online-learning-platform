import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { XhrInterceptor } from './interceptors/app.request.interceptor';
import { AuthActivateRouteGuard } from './routeguards/auth.routeguard';
import { CategoriesComponent } from './categories/categories.component';
import { CourseListComponent } from './course-list/course-list.component';
import { TeachComponent } from './teach/teach.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CartPrewComponent } from './cart-prew/cart-prew.component';
import { AvatarComponent } from './avatar/avatar.component';
import { CartComponent } from './cart/cart.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MyCoursesPrewComponent } from './my-courses-prew/my-courses-prew.component';
import { LearnCourseComponent } from './learn-course/learn-course.component';
import { CourseSectionComponent } from './course-section/course-section.component';
import { RatingComponent } from './rating/rating.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccordionComponent } from './accordion/accordion.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { MyCourseMenuComponent } from './my-course-menu/my-course-menu.component';
import { TabOverviewComponent } from './tab-overview/tab-overview.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TeachDashboardComponent } from './teach-dashboard/teach-dashboard.component';
import { NavPrivateComponent } from './nav-private/nav-private.component';
import { TeachManageComponent } from './teach-manage/teach-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CategoriesComponent,
    CourseListComponent,
    TeachComponent,
    CourseDetailComponent,
    CartPrewComponent,
    AvatarComponent,
    CartComponent,
    MyCoursesComponent,
    MyCoursesPrewComponent,
    LearnCourseComponent,
    CourseSectionComponent,
    RatingComponent,
    SidebarComponent,
    VideoPlayerComponent,
    CheckoutComponent,
    PaymentSuccessComponent,
    TeachDashboardComponent,
    NavPrivateComponent,
    TeachManageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    UserModule,
    HttpClientModule,
    AccordionComponent,
    MyCourseMenuComponent,
    TabOverviewComponent,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true,
    },
    AuthActivateRouteGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
