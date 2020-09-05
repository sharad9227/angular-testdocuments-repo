import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { AssessmentListService } from '../../shared/services/assessment-list.service';
import { ShareDataService } from '../../shared/services/shared.service';
import { ColledtionId } from '../../shared/services/collection-id.service';
import { ResponseModal } from '../../shared/models/response.model';

@Component({
  selector: 'source-info',
  templateUrl: './source-info.component.html',
  styleUrls: ['./source-info.component.scss']
})
export class SourceInfoComponent implements OnInit, AfterViewInit {

  screenHeight: number = null;
  screenWidth: number = null;
  collectionId: String = '';
  alertMessageData: ResponseModal = { 'Message' : '', 'collectionId': 0 , 'isSuccess' : false};

  public assessmentListdata = [];
  public collectionData = [];
  constructor(private assessmentList: AssessmentListService, private router: Router, private colledtionId: ColledtionId, private route: ActivatedRoute, private shareService: ShareDataService) {
  }

  @ViewChild('globalHeader')
  globalHeader: ElementRef;
  @ViewChild('sourceContainer')
  sourceContainer: ElementRef;

  ngAfterViewInit() {}

  ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id');
    this.colledtionId.getListCollectionById(this.collectionId).subscribe(data => {
      this.collectionData = data;
    });
    /** Get source info data */
    this.assessmentList.getListCollection().subscribe(data => {
      this.assessmentListdata = data;
    });
    /** Get alert message after save*/
    this.shareService.getMessageData().subscribe(data => {
      this.alertMessageData = data;
    });
  }

  closeModal() {
    if (this.alertMessageData.isSuccess) {
      this.alertMessageData.Message = '';
    } else {
      this.alertMessageData.Message = '';
    }
  }
}
