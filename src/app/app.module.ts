import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MentionModule } from 'angular-mentions/mention';

import { AppComponent } from './app.component';
import {ProfileProvider} from '../providers/ProfileProvider';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TextInputHighlightModule } from  'angular-text-input-highlight' ;
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { InputTextProvider } from '../providers/InputTextProvider';
import { MentionComponent } from './mention/mention.component';


@NgModule({
  declarations: [
    AppComponent,
    MentionComponent
  ],
  imports: [
    BrowserModule,
    MentionModule,
    HttpModule,
    TextInputHighlightModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProfileProvider, InputTextProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
