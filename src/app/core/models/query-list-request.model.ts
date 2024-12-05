export type PagedListQueryBase = {
  /** Номер страницы */
  pageNumber?: number;
  /** Количество записей на странице */
  pageSize?: number;
};

export type PagedListQuery = PagedListQueryBase & {
  searchTerm?: string;
};

export type SortablePagedListQuery = PagedListQuery & {
  sortBy?: string;
  sortOrder?: boolean;
};
