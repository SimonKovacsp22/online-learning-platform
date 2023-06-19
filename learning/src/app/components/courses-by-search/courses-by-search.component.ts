import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../models/course.model';
import { CourseService } from '../../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-by-search',
  templateUrl: './courses-by-search.component.html',
  styleUrls: ['./courses-by-search.component.css'],
})
export class CoursesBySearchComponent implements OnInit {
  faAngleDown = faAngleDown;
  courses: ICourse[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  prevSearchTerm: string = '';
  searchTerm: string = '';
  isLoading: boolean = false;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listCourses();
    });
  }

  listCourses() {
    const searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    this.searchTerm = searchTerm!;
    if (this.prevSearchTerm != searchTerm) {
      this.pageNumber = 1;
    }
    this.prevSearchTerm = searchTerm!;
    this.isLoading = true;
    this.courseService
      .searchCoursesPaginate(this.pageNumber - 1, this.pageSize, searchTerm!)
      .subscribe((data) => {
        this.processResultPaginate(data);
        this.isLoading = false;
      });
  }

  processResultPaginate = (data: any) => {
    this.courses = data.courses.content;
    this.pageNumber = data.courses.number + 1;
    this.pageSize = data.courses.size;
    this.totalElements = data.courses.totalElements;
  };

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.listCourses();
  }
}
