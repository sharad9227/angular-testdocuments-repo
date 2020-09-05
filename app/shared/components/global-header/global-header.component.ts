import { Component, OnInit } from '@angular/core';
import { HeaderData } from '../../models/header-items';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent implements OnInit {


  public assestsUrl = '/assets/img/mhe.png';

  constructor() { }

  ngOnInit() {

  }

}
