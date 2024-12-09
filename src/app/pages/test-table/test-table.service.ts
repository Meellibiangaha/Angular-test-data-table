import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TestTableRepository } from './test-table.repository';
import { FwbReportsRequest } from './models/fwbReports-request';
import { PaginatorModel } from '../../core/models/paginator.model';
import { PAGINATION_CONFIG } from '../../core/constants/pagination-config';
import { FwbTableFormModel } from './form/fwbReports-table.form';
@Injectable({
  providedIn: 'any',
})
export class TestTableService {
  constructor(private repository: TestTableRepository) {}
  loadFWBReports(request?: FwbReportsRequest): Observable<any> {
    return this.repository.loadFWBReports(request).pipe(
      catchError((reason) => {
        console.error(reason);
        return throwError(() => reason);
      })
    );
  }
  mapFilterToRequest(filter: Partial<FwbTableFormModel>, paginator: PaginatorModel): FwbReportsRequest {
    return {
      pageNumber: paginator?.currentPage ?? PAGINATION_CONFIG.DEFAULT_VALUE.currentPage,
      pageSize: paginator?.pageSize ?? PAGINATION_CONFIG.DEFAULT_VALUE.pageSize,
      from: filter?.range?.from,
      until: filter?.range?.to,
      sortName: filter?.sortName,
      sortBy: filter?.sortBy,
      // sortOrder: filter?.sortDesc,
    };
  }
}
