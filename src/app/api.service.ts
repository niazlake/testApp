import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {concatMap, delay, retryWhen} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {of} from 'rxjs';
import {LibraryService} from './library.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url_main = LibraryService.URL;

  constructor(private http: HttpClient) {
  }

  /**
   * Ищем по загаловку и задаем пагинацию
   * @param title загаловок
   * @param page паггинация
   * @return json файл
   * */
  searchTitle(title: string, page: number) {
    return this.http.get(`${this.url_main}search/advanced?page=${page}&pagesize=10&&order=desc&sort=activity&title=${title}&site=stackoverflow`
    ).pipe(
      retryWhen(errors => errors
        .pipe(
          concatMap((error, count) => {
            return count < 5 && (error.status === 400 || error.status === 0) ? of(error.status) : throwError(error);

          }),
          delay(1000)
        )
      ));
  }

  /**
   * Конкретный запрос для ответов по вопросу
   * @param id вопроса
   * @return json файл с ответами итд
   * */

  getAllbyId(id) {
    return this.http.get(`${this.url_main}questions/${id}?order=desc&sort=activity&site=stackoverflow&filter=!-y(KwOdKR5Ga7mmruVArx2SJykc-M)3jKiDQBk1fq`).pipe(
      retryWhen(errors => errors
        .pipe(
          concatMap((error, count) => {
            return count < 5 && (error.status === 400 || error.status === 0) ? of(error.status) : throwError(error);
          }),
          delay(1000)
        )
      ));
  }
}
