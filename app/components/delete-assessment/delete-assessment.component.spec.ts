import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAssessmentComponent } from './delete-assessment.component';
import { DeleteAssessmentService } from '../../shared/services/delete-assessment.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ShareDataService } from '../../shared/services/shared.service';
import { RouterTestingModule } from '@angular/router/testing';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('DeleteAssessmentComponent', () => {
  let component: DeleteAssessmentComponent;
  let fixture: ComponentFixture<DeleteAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAssessmentComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [ DeleteAssessmentService,
        ShareDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModalTest', () => {
    const expectedValue = "";
    component.alertMessageData.Message = "Temp msg";
    component.closeModal();
    expect(component.alertMessageData.Message ).toEqual(expectedValue);
  });
});
