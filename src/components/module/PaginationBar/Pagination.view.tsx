import React from 'react';

import { ChevronLeft, ChevronRight } from 'components/base/SVG';
import ChevronLeftMax from 'components/base/SVG/ChevronLeftMax';
import ChevronRightMax from 'components/base/SVG/ChevronRightMax';
import theme from 'utils/Theme';

import { PaginationProps } from './Pagination.props';
import { Container } from './Pagination.style';

const Pagination = (props: PaginationProps) => {
  const {
    page,
    limit,
    totalCount,
    rowsPerPage = [10, 25, 50, 100, 200],
    setLimit,
    setPage,
    maxPage,
  } = props;

  const handleClickPrevious = () => {
    setPage((page: number) => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  const handleClickNext = () => {
    setPage((page: number) => {
      if (page === maxPage) return page;
      return page + 1;
    });
  };

  return (
    <Container>
      <div>
        <span>Rows per page:</span>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e?.target.value))}
        >
          {rowsPerPage.map((perPage, i) => (
            <option value={perPage} key={i}>
              {perPage}
            </option>
          ))}
        </select>
      </div>
      <span>
        {page * limit - (limit - 1)} to {page * limit} of {totalCount}
      </span>
      <div>
        <button disabled={page === 1} onClick={() => setPage(1)}>
          <ChevronLeftMax
            fill={page === 1 ? theme.grey.shade5 : theme.grey.shade7}
          />
        </button>
        <button disabled={page === 1} onClick={handleClickPrevious}>
          <ChevronLeft
            width={13}
            height={13}
            fill={page === 1 ? theme.grey.shade5 : theme.grey.shade7}
          />
        </button>
        <button disabled={page === maxPage} onClick={handleClickNext}>
          <ChevronRight
            width={13}
            height={13}
            fill={page === maxPage ? theme.grey.shade5 : theme.grey.shade7}
          />
        </button>
        <button disabled={page === maxPage} onClick={() => setPage(maxPage)}>
          <ChevronRightMax
            fill={page === maxPage ? theme.grey.shade5 : theme.grey.shade7}
          />
        </button>
      </div>
    </Container>
  );
};

export default Pagination;
