import {Injectable} from '@angular/core';

export interface TypeText {
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  public static TEXT: TypeText[] = [
    {
      name: 'error',
      value: 'Ой ошибка! Пожалуйста перезагрузите'
    },
    {
      name: 'answer',
      value: 'Ответы'
    },
    {
      name: 'go',
      value: 'Туда'
    },
    {
      name: 'back',
      value: 'Сюда'
    },
    {
      name: 'nothing',
      value: 'Нету ответов'
    }
  ];

  public static URL = 'https://api.stackexchange.com/2.2/';

  constructor() {
  }
}
