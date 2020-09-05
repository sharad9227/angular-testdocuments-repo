import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

import { LinebreakPipe } from '../../pipes/line-break.pipe';
import { TruncatePipe } from '../../pipes/truncate-filter.pipe';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShareDataService } from '../../services/shared.service';
import { RouterTestingModule } from '@angular/router/testing';
import { KebabComponent } from '../kebab/kebab.component';
import { CommonModalComponent } from '../common.modal/common.modal.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        LinebreakPipe,
        TruncatePipe,
        KebabComponent,
        CommonModalComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule
      ],
      providers: [ShareDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
