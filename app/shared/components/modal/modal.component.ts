import { Component, OnInit, Input, AfterViewInit, ViewChild , ElementRef, EventEmitter, Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  public showOrHide: String = '';
  public optOutModal;
  public buttonType = ButtonType;
  public _buttonPurpose = ButtonPurpose;
  public optModalEvent;
  public selectedOptOut = {'selected' : false };

  @Input('message') message: String;
  @Input('size') size;
  @Input('modal-opt-option') modalOptOption = false;
  @Output() modalOk  = new EventEmitter<String>();
  @Output() modalOptOptionEvent = new EventEmitter<Boolean>();
  @Output() modalCancel = new EventEmitter<String>();

  @ViewChild('modal') modal: ElementRef;

  ngOnInit() {
	this.cookieService.set( 'Delete-Modal-question-List', 'show-modal' );
  }
  ngOnChanges() {
	  if (this.modalOptOption) {
		this.optOutModal = true;
	  }
  }

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

 optOutModalForRemove(event) {
   this.optModalEvent = event; 
   if(event){
     this.selectedOptOut.selected = true;
   }else{
     this.selectedOptOut.selected = false;
   }
 }
 closeAndSave() {
  if(this.optModalEvent){
    this.optOutModal = false;
    this.modalOptOptionEvent.emit(this.optOutModal);
   }
    this.modalOk.emit('Done Save');
  }
  
}
