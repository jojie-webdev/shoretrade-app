export interface PaginationProps {
  page: number;
  limit: number;
  totalCount: number;
  rowsPerPage?: number[];
  setLimit: (limit: number) => void;
  setPage: any;
  maxPage: number;
}
