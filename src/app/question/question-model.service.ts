import { Injectable, OnInit } from '@angular/core';
import { Question } from './model/question/question.abstract';
import { BehaviorSubject,ReplaySubject,Subject } from 'rxjs';
import { TextBoxQuestion } from './model/question/textbox-question.class';
import { CheckBoxQuestion } from './model/question/checkbox-question.class';

@Injectable({
  providedIn: 'root'
})
export class QuestionModelService {

  private questions: Question<any>[] = [];
  private _updated$: BehaviorSubject<Question<any>[]>;
  private _added$: ReplaySubject<Question<any>>;

  constructor() {
    this._updated$ = new BehaviorSubject(this.questions);
    this._added$ = new ReplaySubject();
  }

  get updated$(){
    return this._updated$.asObservable();
  }
  get added$(){
    return this._added$.asObservable();
  }
  
  addQuestion(question: Question<any>){
    this.questions= [
      ...this.questions,
      question,
    ];
    this._added$.next(question);
    this._updated$.next(this.questions);
  }
}
