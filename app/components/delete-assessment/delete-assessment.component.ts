import { Component, OnInit } from '@angular/core';
import { DeleteAssessmentService } from '../../shared/services/delete-assessment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../../shared/services/shared.service';
import { ResponseModal } from '../../shared/models/response.model';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';

@Component({
  selector: 'delete-assessment',
  templateUrl: './delete-assessment.component.html',
  styleUrls: ['./delete-assessment.component.scss']
})

export class DeleteAssessmentComponent implements OnInit {
  collectionId: any;
  private error;
  alertMessageData: ResponseModal = { 'Message' : '', 'collectionId': 0 , 'isSuccess' : false};
  public buttonType = ButtonType;
  public _buttonPurpose = ButtonPurpose;

  constructor(private deleteAssessmentService: DeleteAssessmentService, private shareService: ShareDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
	  this.collectionId = this.route.snapshot.paramMap.get('id');

	  this.deleteAssessmentService.deleteAssessment(this.collectionId).subscribe(data => {
        this.alertMessageData = data;
        this.shareService.sendMessageData(this.alertMessageData);
      }, error => {
        this.error = error;
      });
  }

	closeModal() {
		this.alertMessageData.Message = '';
		this.router.navigate(['/list']);
	}
}
