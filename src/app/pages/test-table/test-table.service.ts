import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TestTableRepository } from './test-table.repository';
import { FwbReportsRequest } from './models/fwbReports-request';
import { PaginatorModel } from '../../core/models/paginator.model';
import { PAGINATION_CONFIG } from '../../core/constants/pagination-config';
import { FwbTableFormModel } from './form/fwbReports-table.form';
import { OrderByEnum } from '../../core/enums/order-by.enum';
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
  mapFilterToRequest(
    filter: Partial<FwbTableFormModel>,
    sortBy: { column: string; orderBy: OrderByEnum },
    paginator: PaginatorModel
  ): FwbReportsRequest {
    return {
      pageNumber: paginator?.currentPage ?? PAGINATION_CONFIG.DEFAULT_VALUE.currentPage,
      pageSize: paginator?.pageSize ?? PAGINATION_CONFIG.DEFAULT_VALUE.pageSize,
      from: filter?.range?.from,
      until: filter?.range?.to,
      searchTerm: filter?.searchTerm,
      sortName: sortBy?.orderBy ? sortBy?.column : null,
      sortBy: sortBy?.orderBy === OrderByEnum.Asc ? 'asc' : sortBy?.orderBy === OrderByEnum.Desc ? 'desc' : null,
    };
  }
}
