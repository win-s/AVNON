import {Question,QuestionType} from './question.abstract';
import { FormBuilder, Validators } from "@angular/forms";
import { ControlType } from "../control-type";
import { Answer, TextBoxAnswer } from '../answer';
import { CreateQuestion } from '../create-question';

export interface TextBoxQuestionType extends QuestionType<string>{};

export class TextBoxQuestion extends Question<string>{
  override controlType = ControlType.TextBox;
  
  override toQuestionForm(){
    const object = {
      [this.key]: [this.value as any]
    }
    if(this.required){
      object[this.key].push([ Validators.required ]);
    }
    return Question.formBuilder.group(object);
  }
  override toAnswer(input: { [key:string]:string }):TextBoxAnswer{
    return {
      question: this.label,
      answer: input[this.key],
      controlType: ControlType.TextBox,
    }
  }

  static override toObject(formValue: CreateQuestion){
    return Question.toObject(formValue);
  }

}