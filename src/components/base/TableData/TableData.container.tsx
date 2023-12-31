import React, { useRef, useState, useEffect } from 'react';

import Checkbox from 'components/base/Checkbox';
import { SortIcon, Minus, ArrowLeft } from 'components/base/SVG';
import theme from 'utils/Theme';

import Typography from '../Typography';
import { TableDataProps } from './TableData.props';
import { WidthComputer } from './TableData.styles';
import TableDataContent from './TableData.view';

function findAndSaveLongestWidth(columnName: string, width: number) {
  if (!columnName || columnName === 'undefined') return;
  const longestWidth = localStorage.getItem(`col:${columnName}`);
  // initialize value;
  if (!longestWidth) localStorage.setItem(`col:${columnName}`, `${width}`);
  if (Number(longestWidth) < width)
    localStorage.setItem(`col:${columnName}`, `${width}`);
}

export default function TableData(props: TableDataProps) {
  const {
    columnType,
    rowType,
    children,
    sorted,
    onClick,
    sticky,
    selected,
    handleOnSelect,
    id,
    onResize,
    column,
    handleMaximizeColum,
    columns,
    isClickable,
    onRowItemClick,
    onRowHover,
    setOnRowHover,
  } = props;
  const [showSortIcon, setShowSortIcon] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [overwriteSelectedProp, setOverWriteSelectedProp] = useState(false);
  const [isWidthComptued, setIsWidthComputed] = useState(false);
  const computerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) setIsChecked(false);
    setOverWriteSelectedProp(false);
  }, [selected]);

  useEffect(() => {
    if (computerRef.current) {
      // compute its width
      findAndSaveLongestWidth(
        String(column?.selector),
        computerRef.current.offsetWidth
      );
      setIsWidthComputed(true);
    }
    // eslint-disable-next-line
  }, [computerRef]);

  const checked = overwriteSelectedProp ? isChecked : selected;

  const Children = (() => {
    if (
      rowType === 'header' ||
      columnType === 'column-first' ||
      columnType === 'column-last'
    )
      return (
        <>
          <div className="table-value-container">
            {columnType === 'column-first' && (
              <Checkbox
                checked={checked}
                onClick={(event) => {
                  event?.stopPropagation();
                  setIsChecked((prev) => {
                    handleOnSelect?.(overwriteSelectedProp ? !prev : !selected);
                    setOverWriteSelectedProp(true);

                    if (selected) {
                      if (overwriteSelectedProp) return !prev;
                      return !selected;
                    }
                    return !prev;
                  });
                }}
                borderColor={theme.grey.shade7}
                style={{ marginRight: 8 }}
                size={16}
                CustomIcon={rowType === 'header' ? Minus : undefined}
              />
            )}
            {children}
            {columnType === 'column-last' && isClickable && onRowHover && (
              <div
                className="btn-view-product"
                onClick={() => onRowItemClick && onRowItemClick()}
              >
                <Typography variant="caption" color="primary">
                  View Product
                </Typography>
                <div style={{ marginLeft: '4px', transform: 'rotate(135deg)' }}>
                  <ArrowLeft fill={theme.brand.primary} />
                </div>
              </div>
            )}
          </div>
          {(() => {
            if (rowType === 'header') {
              if (sorted || showSortIcon)
                return (
                  <SortIcon fill={sorted ? theme.grey.shade7 : undefined} />
                );
            }
          })()}
        </>
      );

    return children;
  })();

  return (
    <TableDataContent
      columns={columns}
      onMouseEnter={() => {
        setShowSortIcon(true);
        setOnRowHover && setOnRowHover(true);
      }}
      onMouseLeave={() => {
        setShowSortIcon(false);
        setOnRowHover && setOnRowHover(false);
      }}
      onClick={(event) => onClick?.(event)}
      columnType={columnType}
      rowType={rowType}
      sticky={sticky}
      id={columnType !== 'column-first' ? id : ''}
      onResize={onResize}
      column={column}
      handleMaximizeColum={handleMaximizeColum}
    >
      {Children}
      {!isWidthComptued && (
        <WidthComputer ref={computerRef}>{Children}</WidthComputer>
      )}
    </TableDataContent>
  );
}
