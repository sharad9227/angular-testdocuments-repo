import { Component, OnInit, Input, AfterViewInit, ViewChild , ElementRef, EventEmitter, Output} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';

@Component({
  selector: 'preview-modal-component',
  templateUrl: './preview.modal.component.html',
  styleUrls: ['./preview.modal.component.scss']
})
export class PreviewModalComponent {

  public buttonType = ButtonType;
  public _buttonPurpose = ButtonPurpose;

  @Input('header') header: String;
  @Input('type') type: String;
  @Input('preview-url') onlinePreview: String;
  @Input('question-index') index;
  @Output() closeModal = new EventEmitter<any>();

  constructor(public sanitizer: DomSanitizer){}

  public closePreviewModal(){
    this.closeModal.emit(true);
  }
}
