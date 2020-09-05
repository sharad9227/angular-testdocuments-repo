import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModalComponent } from './common.modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareDataService } from '../../services/shared.service';
import { SelectedBankQuestionsService } from '../../services/selected-bank-questions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LinebreakPipe } from '../../pipes/line-break.pipe';
import { TruncatePipe } from '../../pipes/truncate-filter.pipe';
import { CookieService } from 'ngx-cookie-service';


describe('CommonModalComponent', () => {
  let component: CommonModalComponent;
  let fixture: ComponentFixture<CommonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommonModalComponent,
        LinebreakPipe,
        TruncatePipe
      ],
      imports: [RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [ShareDataService,
        SelectedBankQuestionsService,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
