import { Component,inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Answer } from '../question/model/answer';
import { ControlType } from '../question/model/control-type';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent {
  answers: Answer[];
  router: Router;
  controlType = ControlType;
  JSON = JSON;

  constructor() {
    this.router = inject(Router);
    this.answers = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    if (!this.answers) {
      this.router.navigate(['']);
    }
  }
}

