import React from 'react';

import { TableDataContentProps } from './TableData.props';
import { TableDataContainer, DataWrapper } from './TableData.styles';

export default function TableDataContent(props: TableDataContentProps) {
  const {
    children,
    rowType,
    columnType,
    onMouseEnter,
    onMouseLeave,
    onClick,
    sticky,
  } = props;

  const tableDataContainerProps = {
    onMouseEnter,
    onMouseLeave,
    onClick,
    ['data-column-type']: columnType,
    ['data-row-type']: rowType,
    ['data-row-sticky']: sticky,
  };

  return (
    <TableDataContainer
      {...Object.fromEntries(
        Object.entries(tableDataContainerProps).filter(([_, value]) => !!value) // this removes undefine and null values
      )}
    >
      <DataWrapper>{children}</DataWrapper>
    </TableDataContainer>
  );
}
