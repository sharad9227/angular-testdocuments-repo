import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KebabComponent } from './kebab.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ShareDataService } from '../../services/shared.service';
import { ViewAssessmentInfoService } from '../../services/view-assessment-info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModalComponent } from '../common.modal/common.modal.component';

describe('kebabComponent', () => {
  let component: KebabComponent;
  let fixture: ComponentFixture<KebabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KebabComponent ],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        NgxPaginationModule,
        CommonModalComponent
      ],
      providers: [ShareDataService,
        ViewAssessmentInfoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KebabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
