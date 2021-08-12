import React, { useRef, useState, useEffect } from 'react';

import { Rnd } from 'react-rnd';

import {
  TableDataContentProps,
  ResizerComponentProps,
} from './TableData.props';
import { TableDataContainer, DataWrapper } from './TableData.styles';

const ResizerComponent = (props: ResizerComponentProps) => {
  const { defaultSize, column, onResize } = props;
  const [artificialKey, setArtificialKey] = useState(
    `${Date.now()}.${Math.random()}`
  );

  return (
    <Rnd
      key={artificialKey} // force rerender.
      disableDragging
      enableResizing={{
        left: true,
        right: true,
      }}
      default={defaultSize}
      onResize={(e, direction, ref, delta, position) => {
        console.log({ e, direction, ref, delta, position });
        e?.stopPropagation();
        onResize?.({ ...position, ...delta }, column);
      }}
      onResizeStop={() => {
        setArtificialKey(`${Date.now()}.${Math.random()}`);
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.25,
          userSelect: 'none',
          // background: 'red', // debugger
        }}
      />
    </Rnd>
  );
};

export default function TableDataContent(props: TableDataContentProps) {
  const {
    children,
    rowType,
    columnType,
    onMouseEnter,
    onMouseLeave,
    onClick,
    sticky,
    id,
    onResize,
    column,
  } = props;

  const TableDataContainerRef = useRef<HTMLDivElement>(null);
  const [defaultSize, setDefaultSize] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const tableDataContainerProps = {
    onMouseEnter,
    onMouseLeave,
    onClick,
    ['data-column-type']: columnType,
    ['data-row-type']: rowType,
    ['data-row-sticky']: sticky,
  };

  useEffect(() => {
    if (TableDataContainerRef.current) {
      setDefaultSize((prevState: any) => ({
        ...prevState,
        width: '100%',
        height: TableDataContainerRef.current?.offsetHeight,
      }));
    }
  }, [TableDataContainerRef]);

  return (
    <TableDataContainer
      ref={TableDataContainerRef}
      {...Object.fromEntries(
        Object.entries(tableDataContainerProps).filter(([_, value]) => !!value) // this removes undefine and null values
      )}
    >
      {!!defaultSize.width && !!defaultSize.height && (
        <ResizerComponent {...props} defaultSize={defaultSize} />
      )}
      <DataWrapper>{children}</DataWrapper>
    </TableDataContainer>
  );
}
