import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

export interface Question {
  items: InItem[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export interface InItem {
  tags: [string];
  owner: {
    reputation: number,
    user_id: number,
    user_type: string,
    profile_image: string,
    display_name: string,
    link: string
  };
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  last_edit_date: number;
  question_id: number;
  link: string;
  title: string;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  inputRest = '';
  displayData: Question;
  currentPage = 1;
  slideCounter = false;
  relatedState = '';
  errorHandle = true;
  loadHandler = true;

  constructor(private api: ApiService, private router: Router) {
    if (localStorage.getItem('InfoGet')) {
      const key = JSON.parse(localStorage.getItem('InfoGet'));
      this.inputRest = key.text;
      this.relatedState = key.text;
      this.currentPage = Number(key.page);
      this.search();
    }
  }

  goFoward() {
    this.currentPage++;
    this.search();
  }

  goBack() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.search();
    }
  }

  search() {
    if (this.inputRest !== this.relatedState) {
      this.currentPage = 1;
      this.relatedState = this.inputRest;
      this.deepSearch();
    } else if (this.inputRest.length > 0) {
      this.deepSearch();
    }
  }

  /**
   * запрос для поиска и фильтра
   * */
  deepSearch() {
    this.api.searchTitle(this.inputRest, this.currentPage).subscribe(
      (data: Question) => {
        if (data.items.length > 0) {
          this.displayData = data;
          this.slideCounter = true;
          this.loadHandler = false;
        } else {
          this.loadHandler = false;
          this.slideCounter = false;
        }
      },
      error => {
        this.loadHandler = false;
        this.errorHandle = false;
      }
    );
  }

  goPage(id) {
    localStorage.setItem('key_id', id);
    const save_data = {
      'text': this.inputRest,
      'page': this.currentPage
    };
    localStorage.setItem('InfoGet', JSON.stringify(save_data));
    this.router.navigate(['view']);
  }

}
