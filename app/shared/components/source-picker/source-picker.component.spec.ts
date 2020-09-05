import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcePickerComponent } from './source-picker.component';

import { TruncatePipe } from '../../pipes/truncate-filter.pipe';
import { SourceInfoService } from '../../services/source-info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareDataService } from '../../services/shared.service';

describe('SourcePickerComponent', () => {
  let component: SourcePickerComponent;
  let fixture: ComponentFixture<SourcePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcePickerComponent,
        TruncatePipe
      ],
      providers: [SourceInfoService,
        ShareDataService
      ],
      imports: [HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
