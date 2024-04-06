import {Question,QuestionType} from './question.abstract';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ControlType } from "../control-type";
import { CheckBoxAnswer, TextBoxAnswer } from '../answer';
import { requiredCheckboxesValidator } from '../../../validators/requiredCheckboxes.validator';
import { CreateQuestionCheckbox } from '../create-question';

import { v4 as uuidv4 } from 'uuid';

interface Option{
    key: string, value: boolean, label: string
}

export interface CheckBoxQuestionType extends QuestionType<string>{
    options?: Option[];
    other: boolean;
};

export class CheckBoxQuestion extends Question<string>{
    static otherKey = '_OTHER_KEY_';
    static otherLabelKey= 'otherLabel';

    override controlType = ControlType.CheckBox;
    options: Option[];
    other: boolean;

    constructor(data: CheckBoxQuestionType){
        super(data);
        this.options = data.options ?? [];
        this.other = data.other ?? false;
    }
    override toQuestionForm(){
        const formBuilder = Question.formBuilder;
        const validators = [];

        if(this.required){
            validators.push( requiredCheckboxesValidator(1))
        }
        const config: any = {
            [this.key]: formBuilder.array(
                this.options.map( item => (
                    new FormControl(item.value)
                ))
            ,validators)
        };

        const form = formBuilder.group(config);

        return form;
    }
    override toAnswer(input: {[key:string]:any}):CheckBoxAnswer{
        const answer = input[this.key]
                        .map( (value: boolean,index: number)=> {
                            if(value && this.options[index].key === CheckBoxQuestion.otherKey){
                                return input[CheckBoxQuestion.otherLabelKey];
                            }
                            return value ? this.options[index].label: null
                        })
                        .filter( (value:string) => value !== null) as string[];

        return {
            question: this.label,
            answer,
            controlType: ControlType.CheckBox
        }
    }

    static override toObject(values: CreateQuestionCheckbox){
        const parentObject = Question.toObject(values);
        const object = {
            ...parentObject,
            options: values.options.map( option => ({ 
                key: uuidv4(),
                value: false,
                label: option,
            })),
            other: values.other,
        };
        if(values.other){
            object.options.push({
                key: this.otherKey,
                value: false,
                label: 'Other',
            })
        }
        return object
    }
}
