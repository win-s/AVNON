import { FormBuilder } from "@angular/forms";
import { ControlType } from "../control-type";
import { CreateQuestion } from "../create-question";

export interface QuestionType<T>{
    value?: T;
    key: string;
    label?: string;
    required?: boolean;
    controlType?: ControlType;
  }
export abstract class Question<T> {
    value: T|undefined;
    key: string;
    label: string;
    required: boolean;
    controlType!: ControlType;

    static formBuilder = new FormBuilder();
  
    constructor(data: QuestionType<T>) {
      this.value = data.value;
      this.key = data.key;
      this.label = data.label ?? '';
      this.required = !!data.required;
    }

    abstract toQuestionForm():any
    abstract toAnswer(input:any):any

    static toObject(formValue: CreateQuestion){
      return {
        key: formValue.key,
        label: formValue.question,
        required: formValue.required,
      }
    }

}
