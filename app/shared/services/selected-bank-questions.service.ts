import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectedBankQuestionsService {

  constructor(private http: HttpClient) {
  }

  public SelectedBankQuestions(data: any): Observable<any> {
    const baseUrl = environment.baseUrl;
    const listUrl = baseUrl + '/paperjam/api/itemInfo';
   //let listUrl = '/../../assets/stubs/sourceBank.json';
    return this.http.post(listUrl, data);
  }
}
