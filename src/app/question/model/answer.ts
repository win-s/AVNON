import { ControlType } from "./control-type";

export interface Answer {
    question: string;
    controlType: ControlType;
    answer: any;
}

export interface CheckBoxAnswer extends Answer{
    answer: string[];
}

export interface TextBoxAnswer extends Answer{
    answer: string;
}