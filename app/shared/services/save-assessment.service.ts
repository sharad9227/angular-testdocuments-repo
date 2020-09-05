import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveAssessmentService {

  constructor(private http: HttpClient) {
  }

  public saveAssessment(data: any): Observable<any> {
    const baseUrl = environment.baseUrl;
    const userId = localStorage.getItem('userId');
    const listUrl = baseUrl + '/paperjam/api/collections' + '/' + userId;
    return this.http.post(listUrl, data);
  }

  public saveAssessmentPreferences(data: any): Observable<any> {
    const baseUrl = environment.baseUrl;
    const userId = localStorage.getItem('userId');
    //const listUrl = baseUrl + '/paperjam/api/outputPreferences' + '/' + userId;
    let listUrl = '../../../assets/stubs/savePreferences.json';
    return this.http.post(listUrl, data);
  }
  
  public saveUserEmailId(collectionId: Number, userEmailId: String): Observable<any> {
	  const baseUrl = environment.baseUrl;
	  const userId = localStorage.getItem('userId');
	  //const listUrl = baseUrl + '/paperjam/api/userEmail/' + collectionId;
	  let listUrl = '../../../assets/stubs/savePreferences.json';
	  let postData = {"userEmailId" : userEmailId};
	  return this.http.post(listUrl, postData);
  }
  
  public getPreferences(collectionId: Number) : Observable<any> {
	  console.log("getPreferences: " + collectionId);
	const baseUrl = environment.baseUrl;
	const userId = localStorage.getItem('userId');
	let listUrl = '../../../assets/stubs/preferences.json';
	//const listUrl = baseUrl + '/paperjam/api/userPreperence/' +userId + "/" + collectionId;
	return this.http.get(listUrl);
  }
  
  public getNewCollectionName(collectionId: any): Observable<any> {
    const baseUrl = environment.baseUrl;
     let listUrl = '../../../assets/stubs/collectionName.json';
    //  const listUrl = baseUrl + '/paperjam/api/collectionName/' + collectionId;
    return this.http.get(listUrl);
  }
  
  public copyCollection(data: any): Observable<any> {
    const baseUrl = environment.baseUrl;
    const userId = localStorage.getItem('userId');
    //  const listUrl = baseUrl + '/paperjam/api/copyCollection' + '/' + userId;
    // return this.http.post(listUrl, data);
    let listUrl = '../../../assets/stubs/collectionCopy.json';
    return this.http.get(listUrl);
  }
}
