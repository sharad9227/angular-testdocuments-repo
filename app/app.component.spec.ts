import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';
import { GlobalHeaderComponent } from './shared/components/global-header/global-header.component';
import { CookieService } from 'ngx-cookie-service';
import { ShareDataService } from './shared/services/shared.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        AppComponent,
        GlobalHeaderComponent,
        LoadingSpinnerComponent
      ],
      providers: [CookieService,
        ShareDataService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'assesment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('assesment');
  });

  it('should render image logo in a image tag with correct path', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toContain('mhe.png');
  });
});
