import { OrderByEnum } from '../enums/order-by.enum';

export type PagedListQueryBase = {
  pageNumber?: number;
  pageSize?: number;
};

export type PagedListQuery = PagedListQueryBase & {
  searchTerm?: string;
};

export type SortablePagedListQuery = PagedListQuery & {
  sortOrder?: string;
};
