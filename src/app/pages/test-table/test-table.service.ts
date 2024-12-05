import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TestTableRepository } from './test-table.repository';

@Injectable({
  providedIn: 'any',
})
export class TestTableService {
  constructor(private repository: TestTableRepository) {}
  loadFWBReports(request?: any): Observable<any> {
    return this.repository.loadFWBReports(request).pipe(
      catchError((reason) => {
        console.error(reason);
        return throwError(() => reason);
      })
    );
  }
}
