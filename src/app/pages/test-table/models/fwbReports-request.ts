import { SortablePagedListQuery } from '../../../core/models/query-list-request.model';

export type fwbReportsRequest = SortablePagedListQuery & {
  sortName?: string;
  startDate?: string;
  endDate?: string;
};
