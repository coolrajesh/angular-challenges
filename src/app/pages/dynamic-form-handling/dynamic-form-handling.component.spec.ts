import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormHandlingComponent } from './dynamic-form-handling.component';

describe('DynamicFormHandlingComponent', () => {
  let component: DynamicFormHandlingComponent;
  let fixture: ComponentFixture<DynamicFormHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormHandlingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
