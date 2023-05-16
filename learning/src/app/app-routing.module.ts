import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CourseListComponent } from './course-list/course-list.component';
import { TeachComponent } from './teach/teach.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CartComponent } from './cart/cart.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { LearnCourseComponent } from './learn-course/learn-course.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categories/:id', component: CourseListComponent },
  { path: 'learning', component: MyCoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'teach', component: TeachComponent },
  { path: 'cart', component: CartComponent },
  { path: 'learning/my/:id', component: LearnCourseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
