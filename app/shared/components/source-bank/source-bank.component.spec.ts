import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceBankComponent } from './source-bank.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../pipes/truncate-filter.pipe';
import { QuestionFilterPipe } from '../../pipes/question-filter.pipe';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { SourceInfoService } from '../../services/source-info.service';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { DndModule } from 'ng2-dnd';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';

import { PreviewModalComponent } from '../preview.modal/preview.modal.component';


describe('SourceBankComponent', () => {
  let component: SourceBankComponent;
  let fixture: ComponentFixture<SourceBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceBankComponent,
        TruncatePipe,
        QuestionFilterPipe,
        OrderByPipe,
        PreviewModalComponent
      ],
      imports: [FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        DragulaModule,
        DndModule
      ],
      providers: [SourceInfoService,
    	  DragulaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
