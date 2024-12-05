import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TestTableService } from './test-table.service';
import { PAGINATION_CONFIG } from '../../core/constants/pagination-config';

export const testTableResolver: ResolveFn<any> = (route, state) => {
  return inject(TestTableService).loadFWBReports({
    page: PAGINATION_CONFIG.DEFAULT_VALUE.currentPage,
    pageSize: PAGINATION_CONFIG.DEFAULT_VALUE.pageSize,
  });
};
