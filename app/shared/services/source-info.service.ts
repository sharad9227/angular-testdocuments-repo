import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SourceInfoService {

  constructor(private http: HttpClient) {
  }
  public baseUrl = environment.baseUrl;
  public getSourceInfoCollection(): Observable<any> {
  	const isbn = localStorage.getItem('isbn');
   // const sourceInfoUrl = this.baseUrl + '/paperjam/api/sourceInfo/' + isbn;
     let sourceInfoUrl = '../../../assets/stubs/sourceInfo.json';
    return this.http.get(sourceInfoUrl);
  }

  public viewBankInfo(bankId: any): Observable<any> {
    const baseUrl = environment.baseUrl;
     let listUrl = '../../../assets/stubs/moreInfo.json';
   // const listUrl = baseUrl + '/paperjam/api/bankInfo/' + bankId;
    return this.http.get(listUrl);
  }

}
