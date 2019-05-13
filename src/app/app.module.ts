import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ViewAnswersComponent} from './view-answers/view-answers.component';


const appRoutes: Routes = [
  {
    path: '',
    component: SearchPageComponent
  },
  {
    path: 'view',
    component: ViewAnswersComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    ViewAnswersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
