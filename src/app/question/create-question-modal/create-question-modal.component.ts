import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ModalService } from '../../services/modal.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { QuestionModelService } from '../question-model.service';
import { CheckBoxQuestion } from '../model/question/checkbox-question.class';
import { ControlType } from '../model/control-type';
import { CreateQuestion, CreateQuestionCheckbox } from '../model/create-question';
import { TextBoxQuestion } from '../model/question/textbox-question.class';
import { Question } from '../model/question/question.abstract';
import { CreateCheckBoxComponent } from './create-check-box/create-check-box.component';


const questionFactory = (formValue: CreateQuestion, controlType: ControlType): Question<any>=>{

  switch(controlType){
    case(ControlType.CheckBox):
      return new CheckBoxQuestion(
        CheckBoxQuestion.toObject(formValue as CreateQuestionCheckbox)
      );
    default:
      return new TextBoxQuestion(
        TextBoxQuestion.toObject(formValue)
      );
    }
}

@Component({
  selector: 'app-create-question-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatListModule,
    MatIconModule,

    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,

    CreateCheckBoxComponent,
  ],
  templateUrl: './create-question-modal.component.html',
  styleUrl: './create-question-modal.component.scss'
})
export class CreateQuestionModalComponent {
  ControlType = ControlType;
  controlType = ControlType.TextBox;

  modalService: ModalService;
  formBuilder: FormBuilder;
  questionModalService: QuestionModelService;

  form: FormGroup;

  constructor(){
    this.modalService = inject(ModalService);
    this.questionModalService = inject(QuestionModelService);
    this.formBuilder = inject(FormBuilder);
    this.form = this.formBuilder.group({
      key: [uuidv4()],
      question: ['',Validators.required],
      required: [false],
    })
  }
  onSubmit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.questionModalService.addQuestion(
        questionFactory(this.form.getRawValue(),this.controlType)
      );
      this.modalService.close();
    }
    
  }
  onCancel(){
    this.modalService.close();
  }

  onClickShowCheckBox(){
    this.controlType = ControlType.CheckBox;
  }

  onAddCheckBox(e: MouseEvent){
    e.preventDefault();
  }
}
