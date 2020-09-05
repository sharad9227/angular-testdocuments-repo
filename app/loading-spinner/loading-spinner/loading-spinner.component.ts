import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../shared/services/shared.service';

@Component({
  selector: 'aa-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  public loading: boolean;
  constructor(private shareDataService: ShareDataService) { }

  ngOnInit() {
    this.shareDataService.getSpinnerData().subscribe(
      data => {
        this.loading = data;
      }
    );
  }

}
