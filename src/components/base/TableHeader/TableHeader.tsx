import React from 'react';

import { TableData } from 'components/base/TableData';
import { ColumnType } from 'components/module/ListingTable/Table.props';
import debounce from 'lodash.debounce';

import { TableHeaderProps } from './TableHeader.props';

export default function TableHeader(props: TableHeaderProps) {
  const {
    columns,
    selectAll,
    onSelectAll,
    setSortField,
    sortField,
    setSortOrder,
    handleMaximizeColum,
    onResize,
  } = props;

  return (
    <>
      {columns.map((column, index) => {
        let columnType: ColumnType;

        if (!index) columnType = 'column-first';
        if (index === columns.length - 1) columnType = 'column-last';

        const handleOnClick = debounce((e) => {
          if (e?.detail >= 2) {
            handleMaximizeColum?.(columns?.[index - 1]?.selector);
          } else {
            setSortField?.(column.selector);
            setSortOrder?.(sortField === column.selector ? 'DESC' : 'ASC');
          }
        }, 200);

        return (
          <TableData
            key={`${column.selector}-${index}`}
            rowType="header"
            columns={columns}
            columnType={columnType!}
            sticky={column?.sticky}
            selected={selectAll}
            handleOnSelect={(state: boolean) => {
              if (index === 0) onSelectAll?.(state);
            }}
            onClick={(e) => {
              e?.persist();
              handleOnClick(e);
            }}
            onResize={onResize}
            sorted={sortField === column.selector}
          >
            <span>{column.name}</span>
          </TableData>
        );
      })}
    </>
  );
}
