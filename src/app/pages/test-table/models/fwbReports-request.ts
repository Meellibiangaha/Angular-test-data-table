import { SortablePagedListQuery } from '../../../core/models/query-list-request.model';

export type FwbReportsRequest = SortablePagedListQuery & {
  sortName?: string;
  startDate?: string;
  endDate?: string;
};
