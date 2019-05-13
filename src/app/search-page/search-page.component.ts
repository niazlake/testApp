import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {LibraryService} from '../library.service';

export interface DataGet {
  id: number;
  name: number;
  author: Author;
  answer_count: number;
  tags: [string];
}

export interface Author {
  name: string;
  id: string;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  inputRest = '';
  displayData: DataGet[] = [];
  currentPage = 1;
  textInline = 'Еще не искали';
  slideCounter = false;
  relatedState = '';
  errorHandle = true;
  errotText = LibraryService.TEXT[0].value;
  answerText = LibraryService.TEXT[1].value;
  goText = LibraryService.TEXT[2].value;
  backText = LibraryService.TEXT[3].value;

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
    } else {
      this.textInline = 'Поле пустое, впиши что нибудь';
    }
  }

  /**
   * запрос для поиска и фильтра
   * */
  deepSearch() {
    this.displayData = [];
    this.textInline = 'Ищем!';
    this.api.searchTitle(this.inputRest, this.currentPage).subscribe(
      (data: any) => {
        if (data.items.length > 0) {
          this.slideCounter = true;
          for (let i = 0; i < data.items.length; i++) {
            const inData = data.items[i];
            this.displayData.push(
              {
                id: Number(inData.question_id),
                name: inData.title,
                answer_count: inData.answer_count,
                author: {
                  name: inData.owner.display_name,
                  id: inData.owner.user_id,
                },
                tags: inData.tags
              }
            );
          }
        } else {
          this.slideCounter = false;
          this.textInline = 'Ничего нету :(';
        }
      },
      error => {
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
