import { Routes } from '@angular/router';
import { QuestionBuilderComponent } from './question/question-builder/question-builder.component';
import { AnswerComponent } from './answer/answer.component';

export const routes: Routes = [
    { path: 'form/builder', component: QuestionBuilderComponent},
    { path: 'answers', component: AnswerComponent},
    { path: '', redirectTo:'/form/builder', pathMatch:'full'}
];
