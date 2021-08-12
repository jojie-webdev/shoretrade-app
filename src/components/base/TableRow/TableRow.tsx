import React from 'react';

import { TableData } from 'components/base/TableData';
import { ColumnType } from 'components/module/ListingTable/Table.props';
import ReactTooltip from 'react-tooltip';

import { TableRowProps } from './TableRow.props';

export default function TableRow(props: TableRowProps) {
  const {
    data,
    columns,
    rowType,
    selected,
    handleOnSelectRow,
    onResize,
  } = props;

  return (
    <>
      {columns.map((column, index) => {
        let columnType: ColumnType;

        if (!index) columnType = 'column-first';
        if (index === columns.length - 1) columnType = 'column-last';

        return (
          <TableData
            rowType={rowType}
            columnType={columnType!}
            key={`${column?.selector}-${data?.id || index}`}
            sticky={column?.sticky}
            selected={selected}
            handleOnSelect={(state) => {
              handleOnSelectRow?.(state, data);
            }}
            onResize={onResize}
            column={{ ...column, index }}
          >
            <span
              data-tip={column?.tooltip?.(data) || data?.[column.selector]}
              className="table-value"
            >
              {column?.component
                ? column?.component(data)
                : data?.[column.selector]}
            </span>
            {column?.tooltip && <ReactTooltip />}
          </TableData>
        );
      })}
    </>
  );
}
