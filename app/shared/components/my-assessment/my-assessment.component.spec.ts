import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssessmentComponent } from './my-assessment.component';

describe('MyAssessmentComponent', () => {
  let component: MyAssessmentComponent;
  let fixture: ComponentFixture<MyAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
