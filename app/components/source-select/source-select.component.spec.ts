import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceSelectComponent } from './source-select.component';
import { NgZone } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SourceBankComponent } from '../../shared/components/source-bank/source-bank.component';
import { SourcePickerComponent } from '../../shared/components/source-picker/source-picker.component';
import { PreferenceComponent } from '../../shared/components/preference/preference.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { KebabComponent } from '../../shared/components/kebab/kebab.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CommonModalComponent } from '../../shared/components/common.modal/common.modal.component';
import { PreviewModalComponent } from '../../shared/components/preview.modal/preview.modal.component';
import { LinebreakPipe } from '../../shared/pipes/line-break.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate-filter.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by.pipe';
import { QuestionFilterPipe } from '../../shared/pipes/question-filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ShareDataService } from '../../shared/services/shared.service';
import { SelectedBankQuestionsService } from './../../shared/services/selected-bank-questions.service';
import {by, element} from 'protractor';
import { FilterTestCategoryComponent } from '../filter-test-category/filter-test-category.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { DndModule } from 'ng2-dnd';
import { SortDirective } from '../../shared/directives/sorting.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderData } from 'src/app/shared/models/header-items';
import { References } from '../../shared/models/references.model';

describe('SourceSelectComponent', () => {
  let component: SourceSelectComponent;
  let fixture: ComponentFixture<SourceSelectComponent>;
  let service: ShareDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SourceSelectComponent,
        SourcePickerComponent,
        HeaderComponent,
        KebabComponent,
        ModalComponent,
        CommonModalComponent,
        PreviewModalComponent,
        LinebreakPipe,
        TruncatePipe,
        OrderByPipe,
        QuestionFilterPipe,
        SourceBankComponent,
        PreferenceComponent,
        FooterComponent,
        FilterTestCategoryComponent,
        SortDirective
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        DragulaModule,
        DndModule,
        NgxPaginationModule
      ],
      providers: [ShareDataService, 
    	  SelectedBankQuestionsService,
          DragulaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(SourceSelectComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ShareDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('createCollectionObjectTestCollectionId', () => {
    component.collectionId = "123456789";
    const expectedValue = 123456789;
    expect(component.createCollectionObject().getcollectionId()).toEqual(expectedValue);
  });

  it('createCollectionObjectTestTitle', () => {
    component.selectedQuestionsListObj = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false, "index": 1}];
	  let header: HeaderData = new HeaderData();
    header.setTitle("My new collection");
    component.headerData = header;
    const expectedValue = "My new collection";
    expect(component.createCollectionObject().getMetaData()[0].getMetaDataValue()).toEqual(expectedValue);
  });

  it('createCollectionObjectTestQuestions', () => {
	  const references = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false},
                      {"ezid":"1", "qid":"2222", "algo":true, "type":"TF", "points":"10", "pinned": true}];

    const referencesArr: References[] = new Array();
    references.forEach((question) => {
      referencesArr.push(new References(question['ezid'], question['qid'], question['algo'], question['type'], question['points'], question['pinned']));
    });
    component.selectedQuestionsListObj = references;
    const expectedValue = referencesArr;
    expect(component.createCollectionObject().getReferences()).toEqual(expectedValue);
  });

  it('assignArrayIndexTest', () => {
	  component.selectedQuestionsListObj = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false, "index": 1}];
    component.setArrayIndex(4);
    component.assignArrayIndex(component.selectedQuestionsListObj);
    const expectedValue = 4;
    
    expect(component.selectedQuestionsListObj[0].index).toEqual(expectedValue);
  });
  */
});
