import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  public static get HOME_URL(): string {
    return 'https://api.stackexchange.com/2.2/';
  }

  constructor() {
  }
}
