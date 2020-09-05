import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceComponent } from './preference.component';
import { CommonModalComponent } from '../common.modal/common.modal.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { DndModule } from 'ng2-dnd';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../pipes/truncate-filter.pipe';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShareDataService } from '../../services/shared.service';

describe('PreferenceComponent', () => {
  let component: PreferenceComponent;
  let fixture: ComponentFixture<PreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceComponent,
    	  CommonModalComponent,
    	  TruncatePipe
      ],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        DragulaModule,
        DndModule
      ],
      providers: [
         ShareDataService,
          DragulaService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showHeaderOrderTest', () => {
    const expectedValue = true;
    component.showHeaderOrder();
    expect(component.showHeaderPreferences).toEqual(expectedValue);
  });
  
  it('editHeaderTest', () => {
    const expectedValue = 5;
    component.editHeader(5, null);
    expect(component.selectedIndex).toEqual(expectedValue);
  });

  it('modalOkJobTest', () => {
    const expectedValue = false;
    component.modalOkJob();
    expect(component.showHeaderPreferences).toEqual(expectedValue);
  });

  it('modalCancelJobTest', () => {
    const expectedValue = false;
    component.modalCancelJob();
    expect(component.showHeaderPreferences).toEqual(expectedValue);
  });

  it('outputPrefChangeTestDocx', () => {
    const expectedValue = 'document';
    component.outputPrefChange('document');
    expect(component.getOutputPreferences().getExportType()).toEqual(expectedValue);
    expect(component.docxPrefVisible).toEqual(true);
  });

  it('outputPrefChangeTestQti', () => {
    const expectedValue = 'qtiPackage';
    component.outputPrefChange('qtiPackage');
    expect(component.getOutputPreferences().getExportType()).toEqual(expectedValue);
    expect(component.docxPrefVisible).toEqual(false);
  });
  
});
