import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSharedModule } from '@mhe/ngx-shared';
import {DndModule} from 'ng2-dnd';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guard/authentication.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { SourceInfoComponent } from './components/source-info/source-info.component';
import { LoadingSpinnerModule } from './loading-spinner/loading-spinner.module';
import { GrdFilterPipe } from './shared/pipes/grd-filter.pipe';
import { SourceSelectComponent } from './components/source-select/source-select.component';
import { DeleteAssessmentComponent } from './components/delete-assessment/delete-assessment.component';
import { EditAssessmentComponent } from './components/edit-assessment/edit-assessment.component';
import { FilterTestCategoryComponent } from './components/filter-test-category/filter-test-category.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'paperjam/lti/launch', component: AssessmentListComponent },
  { path: 'list', component: AssessmentListComponent },
  { path: 'source', component: SourceInfoComponent },
  { path: 'sourceSelect', component: SourceSelectComponent },
  { path: 'source/:id', component: SourceInfoComponent },
  { path: 'deleteAssessment/:id', component: DeleteAssessmentComponent },
  { path: 'editAssessment', component: EditAssessmentComponent },
  { path: 'editAssessment/:operationMode', component: EditAssessmentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AssessmentListComponent,
    GrdFilterPipe,
    SourceInfoComponent,
    GrdFilterPipe,
    SourceSelectComponent,
    DeleteAssessmentComponent,
    EditAssessmentComponent,
    FilterTestCategoryComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    DragulaModule.forRoot(),
    NgxPaginationModule,
    NgxSharedModule,
    SharedModule,
    LoadingSpinnerModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [AuthGuard, CookieService, DragulaService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
