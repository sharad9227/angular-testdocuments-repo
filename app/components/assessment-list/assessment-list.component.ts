import { Component, OnInit, Renderer2 } from '@angular/core';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';
import { AutoUnsubscribe } from './../../shared/components/decorator/autoUnsubscribe.decorator';
import { OrderByPipe } from './../../shared/pipes/order-by.pipe';
import { PaginatePipe } from './../../shared/pipes/pagination.pipe';
import { AssessmentListService } from '../../shared/services/assessment-list.service';
import { ShareDataService } from '../../shared/services/shared.service';
import { KebabMenuInterface } from './../../shared/models/kebab-menu-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.scss']
})

// @AutoUnsubscribe(["assessmentListSubscription"])

export class AssessmentListComponent implements OnInit {

  assessmentListdata = [];
  // assessmentListdata['collections'] = [];
  assessmentListdataCopy = [];
  private error;
  Math: any;
  private pageNumber = 0;
  private totalPage: number;
  public totalItems: number = 0;
  private itemsPerPage = 10;
  public collectionLength = 0;
  public currentPageIndex = 0;
  public searchText: string;
  public show = false;
  private spinner: boolean = false;
  private lastRefreshTime: number = 0;
  public qti: string = 'qtiPackage';
  public docx: string = 'document';
  public message: String = '';
  direction: number;
  isDesc: any;
  column: any;

  public assessmentListSubscription: Subscription;
  public fileDownlodSubscription: Subscription;
  public buttonType = ButtonType;
  public _buttonPurpose = ButtonPurpose;

  kebabMenu: KebabMenuInterface;


  private pageChanged(event, num) {
    let sortParam = {};
    this.assessmentListdata['collections'] = this.assessmentListdataCopy;
    this.pageNumber = event.pageIndex;
    this.currentPageIndex = event.pageIndex;
    const startingIndex = this.pageNumber * this.itemsPerPage;
    const endingIndex = (this.pageNumber * this.itemsPerPage) + this.itemsPerPage;
    // return records.slice(startingIndex,endingIndex);
    //  this.assessmentListdata['collections'] = this.assessmentListdata['collections'].map( item => {
    //   this.assessmentListdata['collections'].slice(startingIndex,endingIndex);
    //  })
    //this.assessmentListdata['collections'] = this.assessmentListdata['collections'].slice(startingIndex,endingIndex);

    sortParam = { 'property': this.column, 'direction': this.direction };
    this.assessmentListdata['collections'] = this.collectionListPipe.transform(this.assessmentListdataCopy, sortParam);
    let paginateParam = { 'itemsPerPage': this.itemsPerPage, 'currentPage': this.pageNumber };
    this.assessmentListdata['collections'] = this.paginate.transform(this.assessmentListdata['collections'], paginateParam);

  }
  constructor(private assessmentList: AssessmentListService, private shareDataService: ShareDataService, private renderer: Renderer2, private collectionListPipe: OrderByPipe, private paginate: PaginatePipe) { }

  ngOnInit() {
    this.assessmentListdata['collections'] = [];
    this.populateTestList();
    this.kebabMenu = {
      get_info: true,
      preview: true,
      pinUnpin: false,
      edit: true,
      copy: true,
      rename: true,
      print: false,
      delete: true,
      remove: false,
    };
  }
  public displayInputText(event) {
    this.searchText = event;
  }

  private populateTestList() {
    this.assessmentListSubscription = this.assessmentList.getListCollection().subscribe(data => {
      this.assessmentListdata = data;
      if (this.assessmentListdata && this.assessmentListdata['collections']) {
        this.collectionLength = this.assessmentListdata['collections'].length;
        this.totalItems = this.assessmentListdata['collections'].length;
        this.assessmentListdataCopy = this.assessmentListdata['collections'];
        let paginateParam = { 'itemsPerPage': this.itemsPerPage, 'currentPage': this.pageNumber };
        if (this.assessmentListdata['collections'] != undefined) {
          this.assessmentListdata['collections'] = this.paginate.transform(this.assessmentListdata['collections'], paginateParam);
        }
      }
    }, error => {
      this.error = error;
    });
  }

  public changeSize(event) {
    const element = this.renderer.selectRootElement('#searchfilter');
    element.style = "width:200px;"
  }

  toggle() {
    this.show = !this.show;
  }

  sort(property) {
    var ctrl = this;
    let sortParam = {};
    ctrl.isDesc = !this.isDesc; //change the direction    
    ctrl.column = property;
    ctrl.direction = this.isDesc ? 1 : -1;
    sortParam = { 'property': ctrl.column, 'direction': ctrl.direction };
    ctrl.assessmentListdata['collections'] = ctrl.collectionListPipe.transform(this.assessmentListdataCopy, sortParam);
    let paginateParam = { 'itemsPerPage': this.itemsPerPage, 'currentPage': this.pageNumber };
    ctrl.assessmentListdata['collections'] = ctrl.paginate.transform(ctrl.assessmentListdata['collections'], paginateParam);
  }

  public refreshList() {
    let dateInSecs = Math.trunc(Date.now() / 1000);

    const localRenderer = this.renderer;
    const element = localRenderer.selectRootElement('#refreshSpinner');
    localRenderer.addClass(element, "fa-spin");
    setTimeout(function () {
      localRenderer.removeClass(element, "fa-spin");
    }, 10000);
    if (this.lastRefreshTime == 0 || dateInSecs - this.lastRefreshTime > 15) {
      this.populateTestList();
      this.lastRefreshTime = dateInSecs;
    }
  }

  public downloadFile(collectionId: string, exportType: string, fileName: string) {
    this.fileDownlodSubscription = this.assessmentList.downloadFile(collectionId, exportType).subscribe(data => {
      var blob = new Blob([data], { type: 'application/octet-stream' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      setTimeout(function () {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadURL);
      }, 100);
    });
  }
}
