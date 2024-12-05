import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { toQueryObj } from '../../core/helpers/to-query-object';

@Injectable({
  providedIn: 'any',
})
export class TestTableRepository {
  constructor(private http: HttpClient) {}

  loadFWBReports(request?: any): Observable<any> {
    const params = new HttpParams({ fromObject: toQueryObj(request) });
    return this.http.get<any>(`https://enxtlinux.enxt.solutions:8013/api/Messages/FWBReports`, { params });
  }
}
