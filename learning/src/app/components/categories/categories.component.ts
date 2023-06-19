import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dash/dashboard.service';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryModalVisible = false;
  categories = new Array(12);
  faAngleRight = faAngleRight;
  isLoading: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.dashboardService.getCategories().subscribe((responseData) => {
      this.categories = <any>responseData.body;
      this.isLoading = false;
    });
  }

  onCategoriesHover = () => (this.categoryModalVisible = true);

  onCategoriesLeave = () => (this.categoryModalVisible = false);
}
