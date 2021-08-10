import React, { useEffect, useState } from 'react';

import { TableData } from 'components/base/TableData';
import { ColumnType } from 'components/module/ListingTable/Table.props';
import ReactTooltip from 'react-tooltip';

import { TableRowProps } from './TableRow.props';

interface TableDataListProps extends TableRowProps {
  column: any;
  index: number;
  length: number;
  identifier: string;
}

const TableDataList = (props: TableDataListProps) => {
  const {
    column,
    index,
    length,
    rowType,
    identifier,
    selected,
    handleOnSelectRow,
    data,
  } = props;

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const containerEl = document.getElementById(`container-${identifier}`);
    const textEl = document.getElementById(`text-${identifier}`);

    const padding = 16 * 2;

    console.log(
      textEl?.innerText,
      Number(containerEl?.offsetWidth) - padding <= Number(textEl?.offsetWidth)
    );

    if (
      Number(containerEl?.offsetWidth) - padding <=
      Number(textEl?.offsetWidth)
    ) {
      setShowTooltip(true);
    }
  }, []);

  let columnType: ColumnType;

  if (!index) columnType = 'column-first';
  if (index === length - 1) columnType = 'column-last';

  return (
    <TableData
      id={`container-${identifier}`}
      rowType={rowType}
      columnType={columnType!}
      key={`key-${identifier}`}
      sticky={column?.sticky}
      selected={selected}
      handleOnSelect={(state) => {
        handleOnSelectRow?.(state, data);
      }}
    >
      <span
        id={`text-${identifier}`}
        data-tip={
          showTooltip
            ? column?.tooltip?.(data) || data?.[column.selector]
            : null
        }
        className="table-value"
      >
        {column?.component ? column?.component(data) : data?.[column.selector]}
      </span>
      {!!showTooltip && <ReactTooltip />}
    </TableData>
  );
};

export default function TableRow(props: TableRowProps) {
  const { data, columns } = props;

  return (
    <>
      {columns.map((column, index) => {
        const identifier = `${data?.id || index}-${column?.selector}`;

        return (
          <TableDataList
            key={`key-identifier`}
            {...props}
            column={column}
            index={index}
            length={columns.length}
            identifier={identifier}
          />
        );

        // return (
        //   <TableData
        //     id={`container-${identifier}`}
        //     rowType={rowType}
        //     columnType={columnType!}
        //     key={`container-${identifier}`}
        //     sticky={column?.sticky}
        //     selected={selected}
        //     handleOnSelect={(state) => {
        //       handleOnSelectRow?.(state, data);
        //     }}
        //   >
        //     <span
        //       id={`text-${identifier}`}
        //       data-tip={column?.tooltip?.(data) || data?.[column.selector]}
        //       className="table-value"
        //     >
        //       {column?.component
        //         ? column?.component(data)
        //         : data?.[column.selector]}
        //     </span>
        //     {column?.tooltip && <ReactTooltip />}
        //   </TableData>
        // );
      })}
    </>
  );
}
