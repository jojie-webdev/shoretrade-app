import React, { useEffect, useState } from 'react';

import { TableData } from 'components/base/TableData';
import { ColumnType } from 'components/module/ListingTable/Table.props';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import ReactTooltip from 'react-tooltip';

import { TableRowProps, TableDataListProps } from './TableRow.props';

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
    onResize,
    handleMaximizeColum,
    columns,
    onRowItemClick,
    onRowHover,
    setOnRowHover,
  } = props;

  const [showTooltip, setShowTooltip] = useState(false);
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isTablet = useMediaQuery({ query: BREAKPOINTS.genericTablet });

  useEffect(() => {
    const containerEl = document.getElementById(`container-${identifier}`);
    const textEl = document.getElementById(`text-${identifier}`);

    const padding = 16 * 2;

    if (
      Number(containerEl?.offsetWidth) - padding <=
      Number(textEl?.offsetWidth)
    ) {
      setShowTooltip(true);
    }
    // eslint-disable-next-line
  }, [isMobile, isTablet]);

  let columnType: ColumnType = '';

  if (!index) columnType = 'column-first';
  if (index === length - 1) columnType = 'column-last';

  return (
    <TableData
      id={`container-${identifier}`}
      rowType={rowType}
      columnType={columnType}
      key={`key-${identifier}`}
      sticky={column?.sticky}
      selected={selected}
      handleOnSelect={(state) => {
        handleOnSelectRow?.(state, data);
      }}
      onResize={onResize}
      column={{ ...column, index }}
      handleMaximizeColum={handleMaximizeColum}
      columns={columns}
      onRowItemClick={onRowItemClick}
      isClickable={data.clickable}
      onRowHover={onRowHover}
      setOnRowHover={setOnRowHover}
    >
      <span
        id={`text-${identifier}`}
        data-tip={
          showTooltip
            ? column?.tooltip?.(data) || data?.[column.selector]
            : null
        }
      >
        {column?.component ? column?.component(data) : data?.[column.selector]}
      </span>
      {!!showTooltip && <ReactTooltip />}
    </TableData>
  );
};

export default function TableRow(props: TableRowProps) {
  const { data, columns } = props;
  const [onRowHover, setOnRowHover] = useState(false);

  return (
    <>
      {columns.map((column, index) => {
        const identifier = `${data?.id || index}-${column?.selector}`;

        return (
          <TableDataList
            key={`key-identifier-${identifier}`}
            {...props}
            column={column}
            index={index}
            length={columns.length}
            identifier={identifier}
            onRowHover={onRowHover}
            setOnRowHover={setOnRowHover}
          />
        );
      })}
    </>
  );
}
