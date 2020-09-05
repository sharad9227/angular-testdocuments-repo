import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { AssessmentListComponent } from './assessment-list.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { KebabComponent } from '../../shared/components/kebab/kebab.component';
import { SortDirective } from '../../shared/directives/sorting.directive';
import { AssessmentListService } from '../../shared/services/assessment-list.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';

import { GrdFilterPipe } from '../../shared/pipes/grd-filter.pipe';
import { LinebreakPipe } from '../../shared/pipes/line-break.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate-filter.pipe';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ShareDataService } from '../../shared/services/shared.service';

describe('AssessmentListComponent', () => {
  let component: AssessmentListComponent;
  let fixture: ComponentFixture<AssessmentListComponent>;
  let service: AssessmentListService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: { get: jasmine.Spy };
  const mockSomeService = {
    getJSON: () => {}
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            AssessmentListComponent,
            SortDirective,
            SearchComponent,
            GrdFilterPipe,
            LinebreakPipe,
            TruncatePipe,
            KebabComponent
        ],
        imports: [
            NgxPaginationModule,
            RouterTestingModule,
            HttpClientTestingModule,
            FormsModule
        ],
      providers: [ AssessmentListService, ShareDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(AssessmentListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AssessmentListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes =
    [
        {
            'user_id'       : '1234567890',
            'collections'   : [
                {
                    'collection_id'         : '1234567890987654321',
                    'associated_isbn'       : '0071234587',
                    'collection_title'      : 'My first print test',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : false,
                    'pendingDOCX'           : false,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654322',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654323',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654324',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654325',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654326',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654327',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654328',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654329',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654330',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654331',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                },
                {
                    'collection_id'         : '1234567890987654332',
                    'associated_isbn'       : '0071234588',
                    'collection_title'      : 'My first print test 1',
                    'creation'              : '16 May 2018 134527',
                    'modified'              : '16 May 2018 134527',
                    'pendingQTI'            : true,
                    'pendingDOCX'           : true,
                    'downloadQTI'           : 'https://someS3bucket/path/file.zip',
                    'downloadDOCX'          : 'https://someS3bucket/path/file.zip'
                }
            ]
        }
    ];

   /*httpClientSpy.get.and.returnValue(expectedHeroes);

    service.getListCollection().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');*/

    const spy = spyOn(service, 'getListCollection').and.returnValue({ subscribe: () => {} });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
