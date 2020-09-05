import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ShareDataService } from './shared.service';

@Injectable()
export class ItemsListService {
  constructor(private http: HttpClient, private shareDataService: ShareDataService) {
  }

  public getCollectionItems(collectionId: String): Observable<any> {
  	const baseUrl = environment.baseUrl;
    const userId = localStorage.getItem('userId');
    let listUrl = '../../../assets/stubs/items-list.json';
   // const listUrl = baseUrl + '/paperjam/api/collection/' + collectionId;
    return this.http.get(listUrl);
  }

}
