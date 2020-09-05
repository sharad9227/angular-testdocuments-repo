import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ColledtionId {

  constructor(private http: HttpClient) {
  }

  // public listUrl = '../../../assets/stubs/assessment-list.json';
  public getListCollectionById(id): Observable<any> {
  	const baseUrl = environment.baseUrl;
    const collectionUrl = baseUrl + '/paperjam/api/collections/' + id;
    // const collectionUrl = '../../../assets/stubs/assessment-list.json';
    return this.http.get(collectionUrl);
  }

}
