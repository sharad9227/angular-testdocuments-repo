import { TestBed } from '@angular/core/testing';

import { SaveAssessmentService } from './save-assessment.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SelectedBankQuestionsService } from './../../shared/services/selected-bank-questions.service';

describe('SaveAssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SelectedBankQuestionsService,
      ],
    });
  });

  it('should be created', () => {
    const service: SaveAssessmentService = TestBed.get(SaveAssessmentService);
    expect(service).toBeTruthy();
  });
});
