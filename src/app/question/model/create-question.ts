import { ControlType } from "./control-type";

export interface CreateQuestion{
    key: string;
    question: string;
    required: boolean;
    controlType: ControlType;
  }

export interface CreateQuestionCheckbox extends CreateQuestion{
  options: string[],
  other: boolean,
  otherLabel?: string,
}
