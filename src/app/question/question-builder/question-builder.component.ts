import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {  MatButtonModule } from '@angular/material/button'

import { QuestionModelService } from '../question-model.service';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../model/question/question.abstract';
import { Answer } from '../model/answer';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { CreateQuestionModalComponent } from '../create-question-modal/create-question-modal.component';


const toAnswer = (questions: Question<any>[],values:any[]): Answer[]=>{
  return questions.map( (question,index)=> question.toAnswer(values[index]) );
}

@Component({
  selector: 'app-question-builder',
  standalone: true,
  imports: [
    DynamicFormQuestionComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './question-builder.component.html',
  styleUrl: './question-builder.component.scss'
})
export class QuestionBuilderComponent implements OnDestroy,OnInit {
  questionModelService: QuestionModelService;
  destory$ = new Subject<void>();

  form!: FormGroup;
  question!: Question<any>;
  forms!: FormGroup;

  formBuilder: FormBuilder;
  router: Router;
  modal: ModalService;

  constructor(){
    this.questionModelService = inject(QuestionModelService);
    this.formBuilder = inject(FormBuilder);
    this.router = inject(Router);
    this.modal = inject(ModalService);

  }
  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      questions:this.formBuilder.array([])
    });
    this.questionModelService.added$
      .pipe(
        takeUntil(this.destory$)
      ).subscribe((question)=>{

        (this.forms.get('questions') as FormArray).push(question.toQuestionForm());
      });
  }

  onSubmit(){

    this.forms.markAllAsTouched();
    if(this.forms.valid){
      let questions;
      this.questionModelService.updated$
        .pipe(take(1))
        .subscribe( q => {questions = q;})

      this.router.navigate(['answers'], {
        state: {
          data: toAnswer(
            questions!,
            this.forms.getRawValue().questions
          )
        },
      });
    }
  }
  onOpenModal(e:MouseEvent){
    e.preventDefault();
    this.modal.open(CreateQuestionModalComponent);
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  } 
}
