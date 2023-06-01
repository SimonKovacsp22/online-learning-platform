import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CourseListComponent } from './course-list/course-list.component';
import { TeachComponent } from './teach/teach.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CartComponent } from './cart/cart.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { LearnCourseComponent } from './learn-course/learn-course.component';
import { IUser } from './models/user.model';

const canActivatePrivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let user: IUser | null = null;
  const router = inject(Router);
  if (sessionStorage.getItem('userdetails')) {
    user = JSON.parse(sessionStorage.getItem('userdetails')!);
    return user?.authStatus === 'AUTH';
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categories/:id', component: CourseListComponent },
  {
    path: 'learning',
    component: MyCoursesComponent,
    canActivate: [canActivatePrivate],
  },
  { path: 'courses/:id', component: CourseDetailComponent },
  {
    path: 'teach',
    component: TeachComponent,
    canActivate: [canActivatePrivate],
  },
  { path: 'cart', component: CartComponent, canActivate: [canActivatePrivate] },
  {
    path: 'learning/my/:id',
    component: LearnCourseComponent,
    canActivate: [canActivatePrivate],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
