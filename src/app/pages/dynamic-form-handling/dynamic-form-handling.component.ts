import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChallengeDetailsComponent } from '../../pages/challenge-details/challenge-details.component';


@Component({
  selector: 'app-dynamic-form-handling',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ChallengeDetailsComponent],
  templateUrl: './dynamic-form-handling.component.html',
  styleUrl: './dynamic-form-handling.component.css'
})
export class DynamicFormHandlingComponent implements OnInit {

  dynamicFormGroup!: FormGroup;
  dynamicFormData: any = null;
  dynamicChallenge = {
    title:
      "In this challenge, you'll build a dynamic form where users can add/remove input fields dynamically using Angular Reactive Forms.",
    requirements: [
      'Name (required, min 3 characters)',
      'Email (required, must be valid)',
      'Dynamic phone numbers (users can add/remove multiple phone numbers)',
      'Use FormArray to manage multiple phone numbers dynamically.',
      'Display validation errors for all fields.',
      'Disable the submit button if the form is invalid.',
      'Log the form data on submission.',
    ],
    features: [
      'Users can add multiple phone numbers.',
      'Users can remove any phone number field.',
      'Validation messages appear when fields are invalid.',
      'Clicking Submit logs the form data to the console.',
    ],
  };
  
  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {    
    this.initForm();      
  }

  initForm() {
    this.dynamicFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumbers: this.formBuilder.array([])
    })
    this.addPhoneNumber();
  }
  
  get phoneNumbers(): FormArray {
    return this.dynamicFormGroup.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() :void {     
    this.phoneNumbers.push(this.formBuilder.control('', Validators.required));
    console.log('Phone Numbers:', this.phoneNumbers.value);
  }

  removePhoneNumber(index:number) {
    this.phoneNumbers.removeAt(index);
  }

  submitForm() {
    if (this.dynamicFormGroup.valid) {
      this.dynamicFormData = this.dynamicFormGroup.value;
    } else {
      console.log('Form is invalid');
    }
  }

}
