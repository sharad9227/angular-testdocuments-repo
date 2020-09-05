import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EditAssessmentComponent } from './edit-assessment.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModalComponent } from '../../shared/components/common.modal/common.modal.component';
import { PreviewModalComponent } from '../../shared/components/preview.modal/preview.modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SortDirective } from '../../shared/directives/sorting.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { GrdFilterPipe } from '../../shared/pipes/grd-filter.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate-filter.pipe';
import { LinebreakPipe } from '../../shared/pipes/line-break.pipe';
import { KebabComponent } from '../../shared/components/kebab/kebab.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeleteAssessmentService } from '../../shared/services/delete-assessment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemsListService } from '../../shared/services/items-list.service';
import { ShareDataService } from '../../shared/services/shared.service';
import { SourcePickerComponent } from '../../shared/components/source-picker/source-picker.component';
import { PreferenceComponent } from '../../shared/components/preference/preference.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { DndModule } from 'ng2-dnd';
import { HeaderData } from 'src/app/shared/models/header-items';
import { References } from '../../shared/models/references.model';

describe('EditAssessmentComponent', () => {
  let component: EditAssessmentComponent;
  let fixture: ComponentFixture<EditAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssessmentComponent,
        HeaderComponent,
        CommonModalComponent,
        PreviewModalComponent,
        SortDirective,
        GrdFilterPipe,
        TruncatePipe,
        LinebreakPipe,
        KebabComponent,
        FooterComponent,
        SourcePickerComponent,
        PreferenceComponent
      ],
      imports: [RouterTestingModule,
        NgxPaginationModule,
        FormsModule,
        HttpClientTestingModule,
        DragulaModule,
        DndModule
      ],
      providers: [DeleteAssessmentService,
        ItemsListService,
        ShareDataService,
        DragulaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('sortedQuestionsListTest', () => {
	  component.selectedQuestionsList = [{"index": 2},{"index": 1}];
    const expectedValue = [{"index": 1},{"index": 2}];
    expect(component.sortedQuestionsList()).toEqual(expectedValue);
  });
  
  it('createCollectionObjectTestCollectionId', () => {
	  component.collectionId = "123456789";
    const expectedValue = 123456789;
    expect(component.createCollectionObject().getcollectionId()).toEqual(expectedValue);
  });

  it('createCollectionObjectTestTitle', () => {
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
    component.itemsList['references'] = references;
    const expectedValue = referencesArr;
    expect(component.createCollectionObject().getReferences()).toEqual(expectedValue);
  });

  it('setCollectionInfoInHeaderTestTotalPoints', () => {
	  component.itemsList['references'] = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false},
                      {"ezid":"1", "qid":"2222", "algo":true, "type":"TF", "points":"15", "pinned": true}];
    
    component.headerData = new HeaderData();
    const expectedValue = 25;
    expect(component.setCollectionInfoInHeader().getTotalPoints()).toEqual(expectedValue);
  });

  it('setCollectionInfoInHeaderTestTotalQuestions', () => {
	  component.itemsList['references'] = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false},
                      {"ezid":"1", "qid":"2222", "algo":true, "type":"TF", "points":"15", "pinned": true},
                      {"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false},
                      {"ezid":"1", "qid":"2222", "algo":true, "type":"TF", "points":"15", "pinned": true}];
    
    component.headerData = new HeaderData();;
    const expectedValue = 4;
    expect(component.setCollectionInfoInHeader().getTotalQuestion()).toEqual(expectedValue);
  });

  it('arrayPinnedQuestionsTest', () => {
	  component.itemsList['references'] = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false},
                      {"ezid":"1", "qid":"2222", "algo":true, "type":"TF", "points":"15", "pinned": true},
                      {"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false},
                      {"ezid":"1", "qid":"2222", "algo":true, "type":"TF", "points":"15", "pinned": true}];
    
    component.arrayPinnedQuestions();
    const expectedValue = [{"ezid":"1", "qid":"2222", "algo":true, "type":"TF", "points":"15", "pinned": true},
                          {"ezid":"1", "qid":"2222", "algo":true, "type":"TF", "points":"15", "pinned": true}];
    expect(component.getPinnedQuestionList()).toEqual(expectedValue);
  });

  it('pinUnpinQuestionTest', () => {
	  component.itemsList['references'] = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false}];
    
    component.pinUnpinQuestion({"index": 0});
    const expectedValue = true;
    
    expect(component.getItemsList()["references"][0].pinned).toEqual(expectedValue);
  });

  it('assignArrayIndexTest', () => {
	  component.itemsList['references'] = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false, "index": 1}];
    component.setArrayIndex(4);
    component.assignArrayIndex(component.itemsList['references']);
    const expectedValue = 4;
    
    expect(component.getItemsList()["references"][0].index).toEqual(expectedValue);
  });

  it('addEditQuestionsTest', () => {
    const expectedValue = "editAssessment";
    component.addEditQuestions();
    expect(component.headerData.getBackPage()).toEqual(expectedValue);
  });
  
  it('addZeroQuestionsTest', () => {
    const expectedValue = "editAssessment";
    component.addZeroQuestions();
    expect(component.headerData.getBackPage()).toEqual(expectedValue);
  });

  it('settingsRouteActivateTest', () => {
    component.itemsList['references'] = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false, "index": 1}];
    component.step = "step2";
    const expectedValue = "step1";
    component.settingsRouteActivate();
    expect(component.step).toEqual(expectedValue);
  });
  /*it('validatePointsTest', () => {
	  component.itemsList['references'] = [{"ezid":"1", "qid":"1111", "algo":false, "type":"MC", "points":"10", "pinned": false}];
    component.step = 'step1';
    component.operationMode = 'edit';
    const compiled = fixture.debugElement;
    const pointFiled = compiled.query(By.css('#points_0')).nativeElement.focusout;
    fixture.detectChanges();

    const expectedValue = true;
    
    expect(component.validatePoints(pointFiled)).toEqual(expectedValue);
  });*/
  
});
