import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewModalComponent } from './preview.modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareDataService } from '../../services/shared.service';
import { SelectedBankQuestionsService } from '../../services/selected-bank-questions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LinebreakPipe } from '../../pipes/line-break.pipe';
import { TruncatePipe } from '../../pipes/truncate-filter.pipe';


describe('ModalComponent', () => {
  let component: PreviewModalComponent;
  let fixture: ComponentFixture<PreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PreviewModalComponent,
        LinebreakPipe,
        TruncatePipe
      ],
      imports: [RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [ShareDataService,
        SelectedBankQuestionsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
