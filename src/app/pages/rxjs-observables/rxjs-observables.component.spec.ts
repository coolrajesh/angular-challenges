import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsObservablesComponent } from './rxjs-observables.component';

describe('RxjsObservablesComponent', () => {
  let component: RxjsObservablesComponent;
  let fixture: ComponentFixture<RxjsObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsObservablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
