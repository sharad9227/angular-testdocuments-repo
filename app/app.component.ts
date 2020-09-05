import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './guard/authentication.service';
import { ShareDataService } from './shared/services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'assesment';
  loading: boolean;
  constructor(private auth: AuthGuard, private shareDataService: ShareDataService) {

  }

  cookieValue;

  ngOnInit() {
    // Set and get cookie values
	  this.auth.login();
  }
}
