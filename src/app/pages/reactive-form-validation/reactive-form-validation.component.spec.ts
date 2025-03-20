import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormValidationComponent } from './reactive-form-validation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MustMatch } from '../../shared/validators/must-match.validator';
import { By } from '@angular/platform-browser';

describe('ReactiveFormValidationComponent', () => {
  let component: ReactiveFormValidationComponent;
  let fixture: ComponentFixture<ReactiveFormValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormValidationComponent, ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactiveFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render title', () => {
    const titleElement = fixture.debugElement.query(By.css('h2'));
    expect(titleElement.nativeElement.textContent).toContain('Reactive Form Validation');
  });

  it('should initialize form with empty values', () => {
    expect(component.userForm.value).toEqual({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: ''
    });
  });
  it('should validate required fields', () => {
    component.userForm.controls['name'].setValue('');
    component.userForm.controls['email'].setValue('');
    component.userForm.controls['password'].setValue('');
    component.userForm.controls['confirmPassword'].setValue('');

    expect(component.userForm.controls['name'].valid).toBeFalse();
    expect(component.userForm.controls['email'].valid).toBeFalse();
    expect(component.userForm.controls['password'].valid).toBeFalse();
    expect(component.userForm.controls['confirmPassword'].valid).toBeFalse();
  });

  it('should validate name field for minlength', () => {
    component.userForm.controls['name'].setValue('Ra');
    expect(component.userForm.controls['name'].valid).toBeFalse();
    component.userForm.controls['name'].setValue('Rajesh');
    expect(component.userForm.controls['name'].valid).toBeTrue();
  });

  it('should validate email field with incorrect format', () => {
    component.userForm.controls['email'].setValue('invalidemail');
    expect(component.userForm.controls['email'].valid).toBeFalse();
    component.userForm.controls['email'].setValue('test@example.com');
    expect(component.userForm.controls['email'].valid).toBeTrue();
  });

  it('should validate password with correct format', () => {
    component.userForm.controls['password'].setValue('abc');
    expect(component.userForm.controls['password'].valid).toBeFalse();

    component.userForm.controls['password'].setValue('Test123');
    expect(component.userForm.controls['password'].valid).toBeTrue();
  });

  // it('should match both passwords correctly', () => {
  //   component.userForm.controls['password'].setValue('Test123');
  //   component.userForm.controls['confirmPassword'].setValue('Test123');
  //   expect(component.userForm.valid).toBeTrue();
  //   console.log('Errors:', component.userForm.controls['password'].errors);
  //   console.log('Confirm Password Errors:', component.userForm.controls['confirmPassword'].errors);
  // })

  // it('should match passwords correctly', () => {
  //   component.userForm.controls['password'].setValue('Test123');
  //   component.userForm.controls['confirmPassword'].setValue('Test123');
  //   expect(component.userForm.valid).toBeTrue();

  //   component.userForm.controls['confirmPassword'].setValue('WrongPass');
  //   expect(component.userForm.valid).toBeFalse();
  //   expect(component.userForm.errors?.['mustMatch']).toBeTruthy();
  // });

  it('should allow optional age field', () => {
    component.userForm.controls['age'].setValue('');
    expect(component.userForm.controls['age'].valid).toBeTrue();

    component.userForm.controls['age'].setValue('25');
    expect(component.userForm.controls['age'].valid).toBeTrue();
    component.userForm.controls['age'].setValue('invalidAge');
    expect(component.userForm.controls['age'].valid).toBeFalse();
  });

  it('should enable submit button when form is valid', () => {
    component.userForm.controls['name'].setValue('Rajesh');
    component.userForm.controls['email'].setValue('rajesh@example.com');
    component.userForm.controls['password'].setValue('Test123');
    component.userForm.controls['confirmPassword'].setValue('Test123');
    component.userForm.controls['age'].setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('input[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should disable submit button when form is invalid', () => {
    component.userForm.controls['name'].setValue('');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('input[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });
  it('should submit the form when valid', () => {
    component.userForm.controls['name'].setValue('Rajesh');
    component.userForm.controls['email'].setValue('rajesh@example.com');
    component.userForm.controls['password'].setValue('Test123');
    component.userForm.controls['confirmPassword'].setValue('Test123');
    component.userForm.controls['age'].setValue('30');
    component.onSubmit();
    expect(component.formData).toEqual({
      name: 'Rajesh',
      email: 'rajesh@example.com',
      password: 'Test123',
      confirmPassword: 'Test123',
      age: '30'
    });
  });

});
