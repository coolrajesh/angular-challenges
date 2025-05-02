import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,FormBuilder,Validators,ReactiveFormsModule } from '@angular/forms';
import { ChallengeDetailsComponent } from '../../pages/challenge-details/challenge-details.component';
import { ApiService } from '../../services/api.service';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'app-dynamic-form-generation',
  standalone: true,
  imports: [CommonModule, FormsModule, ChallengeDetailsComponent, ReactiveFormsModule],
  templateUrl: './dynamic-form-generation.component.html',
  styleUrl: './dynamic-form-generation.component.css'
})
export class DynamicFormGenerationComponent {

  challenges = {
    title:
      "Dynamic Form Generation from JSON Schema",
    requirements: [
      'The form structure should be generated based on a provided JSON schema.',
      'Support input types like text, email, number, checkbox, and select dropdown.',
      'Apply required validation dynamically based on schema.',
      'Display real - time error messages for invalid fields.',
      'On form submission, output the form data as formatted JSON.',
      'The design should be responsive and clean.',
      'Support adding new fields in the JSON schema without changing the component logic.',    ],
    features: [
      'Schema-Driven Form Creation(Build the form dynamically using a provided JSON schema — no hardcoded fields.)',
      'Real-time Validation(Validate the form fields as the user types, showing error messages immediately.)',
      'Apply required, minLength, maxLength, pattern — as defined in the JSON schema.',
      'On submit, display form data as formatted JSON on the screen or console.',
      'Form adapts cleanly on all screen sizes using TailwindCSS',
      'Schema Extendable(Adding new fields to the JSON schema automatically updates the form without touching the component logic.)',
    ],
  };

  formSchema: any = [];
  form: FormGroup = new FormGroup({});
  submittedData: any = null;
  inputTypes = [
    { type: 'text', label: 'Text Input' },
    { type: 'email', label: 'Email Input' },
    { type: 'number', label: 'Number Input' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'radio', label: 'Radio Button' },
    { type: 'select', label: 'Dropdown' }
  ];
  dynamicForm: any[] = [];

  constructor(private fb: FormBuilder, private apiService:ApiService) { }

  ngOnInit() {
   this.apiService.getMockData('form-schema').subscribe((response) => {
     this.formSchema = response.body;
     console.log(this.formSchema);
      this.createForm();
    });
  }

  createForm() {
    this.formSchema.forEach((field: FormField) => {
      const validators = [];
      if (field.validators) {
        if (field.validators.required) validators.push(Validators.required);
        if (field.validators.minLength) validators.push(Validators.minLength(field.validators.minLength));
        if (field.validators.pattern) validators.push(Validators.pattern(new RegExp(field.validators.pattern)));
        if (field.validators.min !== undefined) validators.push(Validators.min(field.validators.min));
        if (field.validators.max !== undefined) validators.push(Validators.max(field.validators.max));
      }
      this.form.addControl(field.name, this.fb.control(field.type === 'checkbox' ? false : '', validators));
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submittedData = JSON.stringify(this.form.value, null, 2);
      console.log(this.submittedData);
    } else {
      this.submittedData = null;
    }
  }

  addElement(element: any) {
    const newElement = {
      type: element.type,
      label: element.label,
      name: element.type + '_' + (this.formSchema.length + 1),
      placeholder: element.type !== 'checkbox' && element.type !== 'radio' ? `Enter ${element.label}` : undefined
    };
    this.dynamicForm.push(newElement);
  }

  removeElement(index: number) {
    this.dynamicForm.splice(index, 1);
  }
}

