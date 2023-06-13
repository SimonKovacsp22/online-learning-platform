import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { TeachComponent } from './components/teach/teach.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { LearnCourseComponent } from './components/learn-course/learn-course.component';
import { IUser } from './models/user.model';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { TeachDashboardComponent } from './components/teach-dashboard/teach-dashboard.component';
import { TeachManageComponent } from './components/teach-manage/teach-manage.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CoursesBySearchComponent } from './components/courses-by-search/courses-by-search.component';

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
  { path: 'success', component: PaymentSuccessComponent },
  {
    path: 'learning',
    component: MyCoursesComponent,
    canActivate: [canActivatePrivate],
  },
  {
    path: 'teach',
    component: TeachDashboardComponent,
    canActivate: [canActivatePrivate],
  },
  {
    path: 'teach/manage/:id',
    component: TeachManageComponent,
  },
  {
    path: 'teach/manage/:id/option/:optionId',
    component: TeachManageComponent,
    canActivate: [canActivatePrivate],
  },
  { path: 'courses/:id', component: CourseDetailComponent },
  {
    path: 'create/:step',
    component: CreateCourseComponent,
    canActivate: [canActivatePrivate],
  },
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
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [canActivatePrivate],
  },
  {
    path: 'search/:searchTerm',
    component: CoursesBySearchComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
