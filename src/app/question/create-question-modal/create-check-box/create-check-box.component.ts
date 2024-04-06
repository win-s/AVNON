import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-check-box',
  standalone: true,
  imports: [
    CommonModule,

    ReactiveFormsModule,
    FormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './create-check-box.component.html',
  styleUrl: './create-check-box.component.scss'
})
export class CreateCheckBoxComponent implements OnInit {
  @Input() form!:FormGroup;
  formBuilder: FormBuilder;

  constructor(){
    this.formBuilder = Inject(FormBuilder);
  }

  ngOnInit(): void {
      this.form.addControl(
        'options',
        new FormArray([new FormControl('',Validators.required)])
      );
      this.form.addControl(
        'other',
        new FormControl(false)
      );
      
  }

  onAddCheckBox(e: MouseEvent){
    const options = this.form.get('options') as FormArray
    if(options.length<5){
      options.push(new FormControl('',Validators.required));
    }
    
    
    e.preventDefault();
  }
}
