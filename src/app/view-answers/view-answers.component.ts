import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {Location} from '@angular/common';
import {LibraryService} from '../library.service';

export interface Answers {
  id: number;
  body: string;
}

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.css']
})
export class ViewAnswersComponent {
  key_id: number;
  display_data: Answers[] = [];
  main_data: any;
  errorHandler = false;
  nothingHandler = false;
  loadHandler = true;
  errorText = LibraryService.TEXT[0].value;
  answerText = LibraryService.TEXT[1].value;
  nothingText = LibraryService.TEXT[4].value;
  loadText = LibraryService.TEXT[5].value;

  /*
  * Тут в самом конструктре делаем запросы и получем нужные данные
  * */
  constructor(private api: ApiService) {
    this.key_id = Number(localStorage.getItem('key_id'));
    this.api.getAllbyId(this.key_id).subscribe(
      (data: any) => {
        if (data.items[0].answers) {
          this.main_data = data.items[0];
          const inData = data.items[0].answers;
          for (let i = 0; i < inData.length; i++) {
            this.display_data.push({
              id: inData[i].id,
              body: inData[i].body
            });
          }
          this.loadHandler = false;
        } else {
          this.loadHandler = false;
          this.nothingHandler = true;
        }
      },
      error1 => {
        this.loadHandler = false;
        this.errorHandler = true;
      }
    );
  }


}
