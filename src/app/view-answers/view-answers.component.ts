import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {Location} from '@angular/common';

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

  /*
  * Тут в самом конструктре делаем запросы и получем нужные данные
  * */
  constructor(private api: ApiService) {
    this.key_id = Number(localStorage.getItem('key_id'));
    this.api.getAllbyId(this.key_id).subscribe(
      (data: any) => {
        this.main_data = data.items[0];
        const inData = data.items[0].answers;
        for (let i = 0; i < inData.length; i++) {
          this.display_data.push({
            id: inData[i].id,
            body: inData[i].body
          });
        }
      },
      error1 => {
        this.errorHandler = true;
      }
    );
  }


}
