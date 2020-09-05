import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs';
import { HeaderData } from '../models/header-items';
import { Collection } from '../models/collection.model';
import { OutputPreferences } from '../models/output-preferences.model';
import { EditListInterface } from '../models/edit-assessment-list.model';
import { HeaderTypes } from '../models/header.model'

@Injectable()
export class ShareDataService {

  private loaderSubject = new Subject<any>();
  private alertMessage = new Subject<any>();
  private confirmBoxMessage = new Subject<any>();
  private alertRenameMessage = new BehaviorSubject<any>('');
  private collectionHeaderSubject = new Subject<any>();
  private selectedBank = new BehaviorSubject<any>('');
  private transferDataSuccess = new BehaviorSubject<any>('');
  private pinnedQuestion = new BehaviorSubject<any>('');
  private selectedQuestions;
  private headerData: HeaderData;
  private landingState;
  private selectedQuestionsList: any;
  private deletedQuestionList: any;
  private collection: Collection;
  private collectionObject: EditListInterface;
  private currentStep = new Subject<String>();
  private outputPreferences = new Subject<OutputPreferences>();
  private collectionSubject = new Subject<Collection>();
  private selectedQuestionList = new Subject<any>();
  private bankName: String;

  public loading: boolean ;
	private defaultHeaderOrder: HeaderTypes[];

	public getDefaultHeaderOrder(): HeaderTypes[] {
		return this.defaultHeaderOrder;
	}

	public setDefaultHeaderOrder(defaultHeaderOrder: HeaderTypes[]) {
		this.defaultHeaderOrder = defaultHeaderOrder;
	}
  

  /** Spinner flag set */
  sendSpinnerData(loading: boolean) {
    this.loaderSubject.next(loading);
  }

  clearSpinnerData() {
    this.loaderSubject.next();
  }

  getSpinnerData(): Observable<any> {
    return this.loaderSubject.asObservable();
  }

  /** Message after update */
  sendMessageData(msg: Object) {
    this.alertMessage.next(msg);
  }

  sendConfirmMessageData(msg: Object) {
    this.confirmBoxMessage.next(msg);
  }

  clearMessageData() {
    this.alertMessage.next();
  }

  getMessageData(): Observable<any> {
    return this.alertMessage.asObservable();
  }

  getConfirmMessageData(): Observable<any> {
    return this.confirmBoxMessage.asObservable();
  }

  /** Rename message when not unique */
  setRenameMessageData(msg: String){
    this.alertRenameMessage.next(msg);
  }
  getRenameMessageData(): Observable<any> {
    return this.alertRenameMessage.asObservable();
  }
  
  /** Get set collection list data */
  getDeletedQuestionId() {
	  return this.deletedQuestionList;
  }

  setDeletedQuestionId(data) {
	  this.deletedQuestionList = data;
  }

  /** Get set state from where select screen is launched */
  getLandingState(){
    return this.landingState;
  }
  setLandingState(value){
    this.landingState = value;
  }
  /** Get set collection list data */
  getDroppedQuestionId() {
	  return this.selectedQuestions;
  }

  setDroppedQuestionId(data) {
	  this.selectedQuestions = data;
  }

  /** get pinned question  */
  setPinQuestionData(data: any) {
    this.pinnedQuestion.next(data);
  }

  getPinQuestionData(): Observable<any> {
    return this.pinnedQuestion.asObservable();
  }

  /** get dropped collection id's */
  setCollection(data: any) {
    this.collectionHeaderSubject.next(data);
  }

  clearCollection() {
    this.collectionHeaderSubject.next();
  }

  getCollection(): Observable<any> {
    return this.collectionHeaderSubject.asObservable();
  }
  /** Get set selected questions list data */
  setSelectedQuestions(data: any) {
    this.selectedQuestionsList = data;
  }

  getSelectedQuestions() {
    return this.selectedQuestionsList;
  }
  getHeaderData() {
	  return this.headerData;
  }

  setHeaderData(headerData: HeaderData) {
	  this.headerData = headerData;
  }

  /** Share data on bank selection */
  setBankObject(data: object) {
    this.selectedBank.next(data);
  }

  getBankObject(): Observable<object> {
    return this.selectedBank.asObservable();
  }

  /** Share data on successfull drop */
  setSuccessMsg(data: String) {
    this.transferDataSuccess.next(data);
  }

  getSuccessMsg(): Observable<String> {
    return this.transferDataSuccess.asObservable();
  }

  public setCollectionDetails(collection: Collection) {
	  this.collection = collection;
  }

  public getCollectionDetails(): Collection {
	  return this.collection;
  }
  public setCollectionObjectDetails(collection: EditListInterface) {
	  this.collectionObject = collection;
  }

  public getCollectionObjectDetails(): EditListInterface {
	  return this.collectionObject;
  }
  setCurrentStep(stepName: String) {
    this.currentStep.next(stepName);
  }

  getCurrentStep(): Observable<String> {
    return this.currentStep.asObservable();
  }

  setOutputPreferences(outputPreferences: OutputPreferences) {
    this.outputPreferences.next(outputPreferences);
  }

  getOutputPreferences(): Observable<OutputPreferences> {
    return this.outputPreferences.asObservable();
  }

  setCollectionSubject(collectionSubject: Collection) {
    this.collectionSubject.next(collectionSubject);
  }

  getCollectionSubject(): Observable<Collection> {
    return this.collectionSubject.asObservable();
  }

  setSelectedQuestionList(selectedQuestions: any) {
    this.selectedQuestionList.next(selectedQuestions);
  }

  getSelectedQuestionList(): Observable<any> {
    return this.selectedQuestionList.asObservable();
  }

  public getBankName(){
    return this.bankName;
  }

  public setBankName(bankName: String){
    this.bankName = bankName;
  }
}
