import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MustMatch } from '../../shared/validators/must-match.validator'; // Import validator


@Component({
  selector: 'app-reactive-form-validation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form-validation.component.html',
  styleUrl: './reactive-form-validation.component.css'
})
export class ReactiveFormValidationComponent {

  userForm!: FormGroup;
  formData: any = null;

  constructor(private formbuilder: FormBuilder) {
    this.initForm();
  }
  
  initForm() {
    this.userForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)]],
      confirmPassword: ['', [Validators.required]],
      age: ['', [Validators.pattern('^[0-9]+$')]]
    },
      { validators: MustMatch('password', 'confirmPassword') }
    )
  }

  get formControl() {
    return this.userForm.controls;
  }

  onSubmit() {
    alert('ok')
    if (this.userForm.valid) {
      this.formData = this.userForm.value;
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
