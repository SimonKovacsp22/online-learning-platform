import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teach-manage-sidebar',
  templateUrl: './teach-manage-sidebar.component.html',
  styleUrls: [
    './teach-manage-sidebar.component.css',
    '../teach-manage/teach-manage.component.css',
  ],
})
export class TeachManageSidebarComponent {
  selectedOption: string = 'basic';
  faCircleCheck = faCircleCheck;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const optionId = params['optionId'];
      if (optionId) {
        this.selectedOption = optionId;
      }
    });
  }
  onOptionChange(optionId: string) {
    const courseId = this.route.snapshot.paramMap.get('id');

    this.router.navigate(['/teach/manage', courseId, 'option', optionId]);
  }
}
