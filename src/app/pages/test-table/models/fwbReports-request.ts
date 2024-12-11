import { SortablePagedListQuery } from '../../../core/models/query-list-request.model';

export type FwbReportsRequest = SortablePagedListQuery & {
  searchTerm?: string;
  sortName?: string;
  from?: string;
  until?: string;
};
