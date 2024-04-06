import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ControlType } from "../model/control-type";
import { Question } from '../model/question/question.abstract';
import { CheckBoxQuestion } from '../model/question/checkbox-question.class';

@Component({
  selector: 'app-dynamic-form-question',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
    
  ],

  templateUrl: './dynamic-form-question.component.html',
  styleUrl: './dynamic-form-question.component.scss'
})
export class DynamicFormQuestionComponent implements OnDestroy,OnInit{
  @Input() question!: Question<any>;
  @Input() form!: FormGroup;

  ControlType = ControlType;
  OtherLabelKey = CheckBoxQuestion.otherLabelKey;
  OtherKey = CheckBoxQuestion.otherKey;

  label!: string;

  constructor(){

  }
  ngOnInit(): void {
    this.label = this.question.required? this.question.label+"*": this.question.label;

    if(this.question.controlType === ControlType.CheckBox
        && (this.question as CheckBoxQuestion).other){
        const otherIndex = (this.question as CheckBoxQuestion).options.length-1;
        
        (this.form.get(this.question.key) as FormArray)?.at(otherIndex).valueChanges.subscribe((selected)=>{
          if(selected){
            this.form.addControl('otherLabel',new FormControl('',Validators.required));
          }else{
            this.form.removeControl('otherLabel');
          }
        });
    }
  }

  ngOnDestroy(): void {
  }
}
