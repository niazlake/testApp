import {Component} from '@angular/core';
import {ApiService} from '../api.service';

interface QuestionId {
  items: [
    {
      comments: [
        {
          'link': string,
          'body': string
        }
        ],
      answers: [
        {
          comment_count: number,
          answer_id: number,
          link: string,
          body: string
        },
        {
          comments: [
            {
              link: string,
              body: string
            }
            ],
          comment_count: number,
          answer_id: number,
          link: string,
          body: string
        }],
      comment_count: number,
      last_activity_date: number,
      question_id: number,
      link: string,
      title: string,
      body: string
    }
    ];
}

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.css']
})
export class ViewAnswersComponent {
  key_id: number;
  display_data: QuestionId;
  errorHandler = false;
  nothingHandler = false;
  loadHandler = true;

  /*
  * Тут в самом конструктре делаем запросы и получем нужные данные
  * */

  constructor(private api: ApiService) {
    this.key_id = Number(localStorage.getItem('key_id'));
    this.api.getAllbyId(this.key_id).subscribe(
      (data: QuestionId) => {
        if (data.items[0].answers) {
          this.display_data = data;
          this.loadHandler = false;
        } else {
          this.nothingHandler = true;
          this.loadHandler = false;
        }
      },
      (err) => {
        this.loadHandler = false;
        this.errorHandler = true;
      }
    );
  }


}
