import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { UserModule } from './services/user/user.module';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { XhrInterceptor } from './interceptors/app.request.interceptor';
import { AuthActivateRouteGuard } from './routeguards/auth.routeguard';
import { CategoriesComponent } from './components/categories/categories.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { TeachComponent } from './components/teach/teach.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CartPrewComponent } from './components/cart-prew/cart-prew.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CartComponent } from './components/cart/cart.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { MyCoursesPrewComponent } from './components/my-courses-prew/my-courses-prew.component';
import { LearnCourseComponent } from './components/learn-course/learn-course.component';
import { CourseSectionComponent } from './components/course-section/course-section.component';
import { RatingComponent } from './components/rating/rating.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { MyCourseMenuComponent } from './components/my-course-menu/my-course-menu.component';
import { TabOverviewComponent } from './components/tab-overview/tab-overview.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { TeachDashboardComponent } from './components/teach-dashboard/teach-dashboard.component';
import { NavPrivateComponent } from './components/nav-private/nav-private.component';
import { TeachManageComponent } from './components/teach-manage/teach-manage.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { SearchComponent } from './components/search/search.component';
import { CoursesBySearchComponent } from './components/courses-by-search/courses-by-search.component';
import { CourseTemplateComponent } from './components/course-template/course-template.component';
import { TeachManageSidebarComponent } from './components/teach-manage-sidebar/teach-manage-sidebar.component';
import { AlertSuccessComponent } from './components/alert-success/alert-success.component';
import { ManageSectionComponent } from './components/manage-section/manage-section.component';
import { ManageLectureComponent } from './components/manage-lecture/manage-lecture.component';
import { AlertErrorComponent } from './components/alert-error/alert-error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    CreateCourseComponent,
    SearchComponent,
    CoursesBySearchComponent,
    CourseTemplateComponent,
    TeachManageSidebarComponent,
    AlertSuccessComponent,
    ManageSectionComponent,
    ManageLectureComponent,
    AlertErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    UserModule,
    HttpClientModule,
    FormsModule,
    AccordionComponent,
    ReactiveFormsModule,
    MyCourseMenuComponent,
    TabOverviewComponent,
    NgbModule,
    QuillModule.forRoot(),
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
