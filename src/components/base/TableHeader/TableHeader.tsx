import React from 'react';

import { TableData } from 'components/base/TableData';
import { ColumnType } from 'components/module/ListingTable/Table.props';

import { TableHeaderProps } from './TableHeader.props';

export default function TableHeader(props: TableHeaderProps) {
  const {
    columns,
    selectAll,
    onSelectAll,
    setSortField,
    sortField,
    setSortOrder,
  } = props;

  return (
    <>
      {columns.map((column, index) => {
        let columnType: ColumnType;

        if (!index) columnType = 'column-first';
        if (index === columns.length - 1) columnType = 'column-last';

        return (
          <TableData
            key={`${column.selector}-${index}`}
            rowType="header"
            columnType={columnType!}
            onClick={() => {
              setSortField?.(column.selector);
              setSortOrder?.(sortField === column.selector ? 'DESC' : 'ASC');
            }}
            sorted={sortField === column.selector}
            sticky={column?.sticky}
            handleOnSelect={(state: boolean) => {
              if (index === 0) onSelectAll?.(state);
            }}
            selected={selectAll}
          >
            <span data-tip={column.name}>{column.name}</span>
          </TableData>
        );
      })}
    </>
  );
}
