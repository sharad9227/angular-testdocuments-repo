import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class DeleteAssessmentService {

  constructor(private http: HttpClient) {
  }

  public deleteAssessment(collectionId): Observable<any> {
	const userId = localStorage.getItem('userId');
  	const baseUrl = environment.baseUrl;
    const listUrl = baseUrl + '/paperjam/api/collection/' + userId + '/' + collectionId;
    return this.http.delete(listUrl);
  }

}
