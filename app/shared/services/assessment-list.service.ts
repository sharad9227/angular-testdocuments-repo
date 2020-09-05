import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class AssessmentListService {

  constructor(private http: HttpClient) {
  }

  public getListCollection(): Observable<any> {
  	const baseUrl = environment.baseUrl;
    const userId = localStorage.getItem('userId');
   let listUrl = '../../../assets/stubs/assessment-list.json'
    // const listUrl = baseUrl + '/paperjam/api/collections/' + userId;
    return this.http.get(listUrl);
  }

  public downloadFile(collectionId :String, exportType:String): Observable<any> {
  	const baseUrl = environment.baseUrl;
    const userId = localStorage.getItem('userId');
    const downloadUrl = baseUrl + '/paperjam/api/download/' + userId + '/' + collectionId + '/' + exportType;
    return this.http.get(downloadUrl, {responseType: 'blob'});
  }

  public renameCollection(data: any): Observable<any> {
    const baseUrl = environment.baseUrl;
    const userId = localStorage.getItem('userId');
    const renameUrl = baseUrl + '/rename/collection/' + userId;
    return this.http.post(renameUrl,data);
  }
}
