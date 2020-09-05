import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceInfoComponent } from './source-info.component';

import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModalComponent } from '../../shared/components/common.modal/common.modal.component';
import { SourcePickerComponent } from '../../shared/components/source-picker/source-picker.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TruncatePipe } from '../../shared/pipes/truncate-filter.pipe';
import { LinebreakPipe } from '../../shared/pipes/line-break.pipe';
import { KebabComponent } from '../../shared/components/kebab/kebab.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AssessmentListService } from '../../shared/services/assessment-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ColledtionId } from '../../shared/services/collection-id.service';
import { ShareDataService } from '../../shared/services/shared.service';
import { SourceInfoService } from '../../shared/services/source-info.service';
import { NgxPaginationModule } from 'ngx-pagination';

describe('SourceInfoComponent', () => {
  let component: SourceInfoComponent;
  let fixture: ComponentFixture<SourceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceInfoComponent,
        HeaderComponent,
        CommonModalComponent,
        SourcePickerComponent,
        FooterComponent,
        TruncatePipe,
        LinebreakPipe,
        KebabComponent
      ],
      imports: [FormsModule,
        HttpClientTestingModule,
        NgxPaginationModule,
        RouterTestingModule
      ],
      providers: [AssessmentListService,
        ColledtionId,
        ShareDataService,
        SourceInfoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
