import React, { MouseEvent, useState, useEffect } from 'react';

import Checkbox from 'components/base/Checkbox';
import { SortIcon, Minus } from 'components/base/SVG';
import theme from 'utils/Theme';

import { TableDataProps } from './TableData.props';
import TableDataContent from './TableData.view';

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
  } = props;
  const [showSortIcon, setShowSortIcon] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [overwriteSelectedProp, setOverWriteSelectedProp] = useState(false);

  useEffect(() => {
    if (!selected) setIsChecked(false);
    setOverWriteSelectedProp(false);
  }, [selected]);

  const checked = overwriteSelectedProp ? isChecked : selected;

  return (
    <TableDataContent
      onMouseEnter={() => setShowSortIcon(true)}
      onMouseLeave={() => setShowSortIcon(false)}
      onClick={(event) => onClick?.(event)}
      columnType={columnType}
      rowType={rowType}
      sticky={sticky}
    >
      {(() => {
        if (rowType === 'header' || columnType === 'column-first')
          return (
            <>
              <div className="table-value-container">
                {columnType === 'column-first' && (
                  <Checkbox
                    checked={checked}
                    onClick={(event) => {
                      event?.stopPropagation();
                      setIsChecked((prev) => {
                        handleOnSelect?.(
                          overwriteSelectedProp ? !prev : !selected
                        );
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
      })()}
    </TableDataContent>
  );
}
