import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-assessment',
  templateUrl: './my-assessment.component.html',
  styleUrls: ['./my-assessment.component.scss']
})
export class MyAssessmentComponent {


  @Input() assessmentList;

  options: any = {
    removeOnSpill: true
  };

  ngOnChanges() {
    console.log(this.assessmentList);
  }

}
