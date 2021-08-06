import React, { useState, useEffect } from 'react';

import { Crab } from 'components/base/SVG';
import { TableHeader } from 'components/base/TableHeader';
import { TableRow } from 'components/base/TableRow';
import Loading from 'components/module/Loading';
import theme from 'utils/Theme';

import { TableComponentProps } from './Table.props';
import {
  Container,
  Table,
  PreloaderWrapper,
  SVGContainer,
} from './Table.styles';

export const TableComponent = (props: TableComponentProps) => {
  const {
    isLoading,
    columnTemplate,
    columns,
    data = [],
    sortField,
    setSortField,
    searchTerm,
    setSortOrder,
    selectedIds,
    setSelectedIds,
    isAllSelected,
    setIsAllSelected,
    onSelect,
    unselectedIds,
  } = props;

  const handleOnSelectAll = (state: boolean) => {
    setIsAllSelected(state);
  };

  const handleSelectRow = (isSelected: boolean, data: any) => {
    onSelect(data?.id, isSelected);
  };

  return (
    <Container>
      <Table count={columns?.length}>
        <TableHeader
          sortField={sortField}
          setSortField={setSortField}
          selectAll={isAllSelected}
          onSelectAll={handleOnSelectAll}
          columns={columns}
          setSortOrder={setSortOrder}
        />
        {!isLoading && (
          <>
            {data.map((item, index) => {
              return (
                <TableRow
                  rowType={data.length - 1 === index ? 'last-row' : undefined}
                  data={item}
                  key={item?.id}
                  columns={columns}
                  selected={
                    unselectedIds?.includes(item?.id) === true
                      ? false
                      : isAllSelected || selectedIds?.includes(item?.id)
                  }
                  handleOnSelectRow={handleSelectRow}
                />
              );
            })}
          </>
        )}
      </Table>
      {isLoading && (
        <PreloaderWrapper>
          <Loading />
        </PreloaderWrapper>
      )}
      {!isLoading && !data.length && (
        <SVGContainer>
          <Crab height={268} width={268} fill={theme.grey.shade7} />
          <div>
            Unable to find result{' '}
            {searchTerm ? `for keyword: '${searchTerm}'` : ''}
          </div>
        </SVGContainer>
      )}
    </Container>
  );
};
