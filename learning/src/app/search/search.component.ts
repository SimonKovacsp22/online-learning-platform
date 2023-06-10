import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  faLense = faMagnifyingGlass;
  focused: boolean = false;
  constructor(private router: Router) {}

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  toggleIconOpacity() {
    if (this.focused) {
      this.focused = false;
    } else {
      this.focused = true;
    }
  }
}
