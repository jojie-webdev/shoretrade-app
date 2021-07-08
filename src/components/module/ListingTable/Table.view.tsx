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
  } = props;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const handleOnSelectAll = (state: boolean) => {
    setIsAllSelected(state);

    if (state) setSelectedIds(data.map((i) => i?.id));
    else setSelectedIds([]);
  };

  const handleSelectRow = (isSelected: boolean, data: any) => {
    if (isSelected) setSelectedIds([...selectedIds, data?.id]);
    else setSelectedIds(selectedIds?.filter((id) => id !== data?.id));
  };

  // inactive the header checkbox when no active row selected
  useEffect(() => {
    if (selectedIds.length === 0) setIsAllSelected(false);
  }, [selectedIds, isAllSelected]);

  return (
    <Container>
      <Table
        style={{
          gridTemplateColumns: columnTemplate
            .map((unit) => `minmax(${unit}, 1fr)`)
            .join(' '),
        }}
      >
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
                  selected={isAllSelected}
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
