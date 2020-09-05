import { Component, OnInit, Input, AfterViewInit, ViewChild , ElementRef, EventEmitter, Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';

@Component({
  selector: 'common-modal-component',
  templateUrl: './common.modal.component.html',
  styleUrls: ['./common.modal.component.scss']
})
export class CommonModalComponent implements OnInit, AfterViewInit {

  public showOrHide: String = '';
  public optOutModal;
  public buttonType = ButtonType;
  public _buttonPurpose = ButtonPurpose;

  @Input('size') size = '';
  @Input('header') header;
  @Output() modalOk  = new EventEmitter<String>();
  @Output() modalCancel = new EventEmitter<String>();

  @ViewChild('modal') modal: ElementRef;

  ngOnInit() {
	this.cookieService.set( 'Delete-Modal-question-List', 'show-modal' );
  }
  ngOnChanges() {}

  constructor( private cookieService: CookieService) {

  }

  ngAfterViewInit() {
  }
  openModalDialog() {
    this.showOrHide = 'block'; // Set block css
 }

 closeModalDialog() {
  this.modalCancel.emit('Cancel Save');
 }
 closeAndSave() {
    this.modalOk.emit('Done Save');
  }
}
