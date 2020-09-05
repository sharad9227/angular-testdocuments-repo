import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSharedModule } from '@mhe/ngx-shared';
import { RouterModule, Routes } from '@angular/router';

import {DndModule} from 'ng2-dnd';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { KebabComponent } from './components/kebab/kebab.component';
import { ModalComponent } from './components/modal/modal.component';
import { PreviewModalComponent } from './components/preview.modal/preview.modal.component';
import { CommonModalComponent } from './components/common.modal/common.modal.component';
import { MyAssessmentComponent } from './components/my-assessment/my-assessment.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { SearchComponent } from './components/search/search.component';
import { SourcePickerComponent } from './components/source-picker/source-picker.component';
import { SourceBankComponent } from './components/source-bank/source-bank.component';
import { SortDirective } from './directives/sorting.directive';
import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { AssessmentNameValidatorDirective } from './directives/nameValidator.directive'

import { AssessmentListService } from './services/assessment-list.service';
import { ItemsListService } from './services/items-list.service';
import { ShareDataService } from './services/shared.service';
import { SourceInfoService } from './services/source-info.service';
import { SaveAssessmentService } from './services/save-assessment.service';
import { SelectedBankQuestionsService } from './services/selected-bank-questions.service';
import { PreferenceComponent } from './components/preference/preference.component';
import { ColledtionId } from './services/collection-id.service';
import { DeleteAssessmentService } from './services/delete-assessment.service';
import { TruncatePipe } from './pipes/truncate-filter.pipe';
import { LinebreakPipe } from './pipes/line-break.pipe';
import { PaginatePipe } from './pipes/pagination.pipe';
import { ViewAssessmentInfoService } from './services/view-assessment-info.service';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { QuestionFilterPipe } from './pipes/question-filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ModalComponent,
        CommonModalComponent,
        PreviewModalComponent,
        MyAssessmentComponent,
        GlobalHeaderComponent,
        SourcePickerComponent,
        SourceBankComponent,
        PreferenceComponent,
        SortDirective,
        ClickOutsideDirective,
        AssessmentNameValidatorDirective,
        KebabComponent,
        SearchComponent,
        TruncatePipe,
        LinebreakPipe,
        PaginatePipe,
        QuestionFilterPipe,
        OrderByPipe
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxSharedModule,
        CommonModule,
        HttpClientModule,
        DndModule.forRoot(),
        DragulaModule.forRoot()        
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ModalComponent,
        CommonModalComponent,
        PreviewModalComponent,
        SourcePickerComponent,
        SourceBankComponent,
        MyAssessmentComponent,
        GlobalHeaderComponent,
        PreferenceComponent,
        SortDirective,
        ClickOutsideDirective,
        AssessmentNameValidatorDirective,
        KebabComponent,
        SearchComponent,
        TruncatePipe,
        LinebreakPipe,
        PaginatePipe,
        OrderByPipe
    ],
    providers: [
        AssessmentListService,
        ShareDataService,
        SourceInfoService,
        SaveAssessmentService,
        SelectedBankQuestionsService,
        ColledtionId,
        DeleteAssessmentService,
        ViewAssessmentInfoService,
        ItemsListService,
        QuestionFilterPipe,
        PaginatePipe,
        OrderByPipe
    ]
})

export class SharedModule {}
