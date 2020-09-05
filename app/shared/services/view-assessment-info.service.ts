import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ViewAssessmentInfoService {

  constructor(private http: HttpClient) {
  }

  public viewAssessmentList(collectionId: any): Observable<any> {
   // const baseUrl = environment.baseUrl;
   let listUrl = '../../../assets/stubs/moreInfo.json';
  //  const listUrl = baseUrl + '/paperjam/api/collectionInfo/' + collectionId;
    return this.http.get(listUrl);
  }
}
