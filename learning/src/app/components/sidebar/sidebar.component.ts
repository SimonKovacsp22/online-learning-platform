import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login/login.service';
import { faXmark, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dash/dashboard.service';
import { ICategory } from '../../models/category.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() name = 'World';
  faXmark = faXmark;
  faAngleRight = faAngleRight;
  categories = new Array(12);
  isLoading: boolean = false;
  constructor(
    public activeOffcanvas: NgbActiveOffcanvas,
    public loginService: LoginService,
    private dashboardService: DashboardService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.dashboardService.getCategories().subscribe((responseData) => {
      this.categories = <any>responseData.body;
      this.isLoading = false;
    });
  }

  logOut() {
    this.activeOffcanvas.dismiss();
    this.loginService.logOut();
  }
}
