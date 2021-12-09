import React, { useRef, useState, useEffect, useMemo } from 'react';

import { Rnd } from 'react-rnd';

import {
  TableDataContentProps,
  ResizerComponentProps,
} from './TableData.props';
import { TableDataContainer, DataWrapper } from './TableData.styles';

const ResizerComponent = (props: ResizerComponentProps) => {
  const { defaultSize, column, onResize, columns, handleMaximizeColum } = props;
  const [resizeSwitch, setResizeSwitch] = useState(false);
  // eslint-disable-next-line
  const artKey = useMemo(() => `${Date.now()}.${Math.random()}`, [
    resizeSwitch,
  ]);

  const resizerRef = useRef<any>(null);

  useEffect(() => {
    if (resizerRef?.current?.resizableElement.current) {
      const dragableEl = resizerRef?.current?.resizableElement
        .current as HTMLDivElement;
      const resizerEl = dragableEl.children?.[1] as HTMLDivElement;
      const leftRightEl = resizerEl?.children?.[0] as HTMLDivElement;
      const resizerRightEl = resizerEl?.children?.[1] as HTMLDivElement;
      leftRightEl.style.zIndex = '99999';
      leftRightEl.style.pointerEvents = 'inherit';

      resizerRightEl.style.zIndex = '99999';
      resizerRightEl.style.pointerEvents = 'inherit';

      leftRightEl.ondblclick = (e) => {
        e.stopImmediatePropagation();
        const col = columns?.[Number(column?.index) - 1];
        if (col) handleMaximizeColum?.(col.selector);
      };

      resizerRightEl.ondblclick = (e) => {
        e.stopImmediatePropagation();
        const col = columns?.[column?.index];
        if (col) handleMaximizeColum?.(col.selector);
      };
    }
    // eslint-disable-next-line
  }, [resizerRef, artKey]);

  return (
    <Rnd
      ref={resizerRef}
      key={artKey} // force rerender.
      disableDragging
      enableResizing={{
        left: true,
        right: true,
      }}
      default={{
        ...defaultSize,
        height: '100%',
      }}
      onResize={(e, direction, ref, delta, position) => {
        e?.stopPropagation();
        onResize?.({ ...position, ...delta }, column);
      }}
      onResizeStop={() => {
        setTimeout(() => setResizeSwitch((prev) => !prev), 500);
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
    column,
    isClickable,
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
    ['data-column-type']: columnType, // eslint-disable-line
    ['data-row-type']: rowType, // eslint-disable-line
    ['data-row-sticky']: sticky, // eslint-disable-line
    isClickable,
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
        <ResizerComponent
          column={column}
          {...props}
          defaultSize={defaultSize}
        />
      )}
      <DataWrapper>{children}</DataWrapper>
    </TableDataContainer>
  );
}
