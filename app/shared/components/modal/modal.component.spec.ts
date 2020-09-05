import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareDataService } from '../../services/shared.service';
import { SelectedBankQuestionsService } from '../../services/selected-bank-questions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LinebreakPipe } from '../../pipes/line-break.pipe';
import { TruncatePipe } from '../../pipes/truncate-filter.pipe';


describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
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
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
