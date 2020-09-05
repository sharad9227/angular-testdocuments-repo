import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareDataService } from '../../services/shared.service';
import { SelectedBankQuestionsService } from '../../services/selected-bank-questions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LinebreakPipe } from '../../pipes/line-break.pipe';
import { TruncatePipe } from '../../pipes/truncate-filter.pipe';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent,
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
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
