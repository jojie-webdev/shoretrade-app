import React, { useState, useEffect, useRef } from 'react';

import { Crab } from 'components/base/SVG';
import { TableHeader } from 'components/base/TableHeader';
import { TableRow } from 'components/base/TableRow';
import Loading from 'components/module/Loading';
import theme from 'utils/Theme';

import { TableComponentProps } from './Table.props';
import {
  Container,
  Table,
  PreloaderWrapper,
  SVGContainer,
} from './Table.styles';

export const TableComponent = (props: TableComponentProps) => {
  const {
    isLoading,
    columnTemplate,
    columns,
    data = [],
    sortField,
    sortOrder,
    setSortField,
    searchTerm,
    setSortOrder,
    selectedIds,
    isAllSelected,
    setIsAllSelected,
    onSelect,
    unselectedIds,
    onRowItemClick
  } = props;

  const tableRef = useRef<HTMLDivElement>(null);
  const [overwriteLayout, setOverwriteLayout] = useState(false);
  const [layout, setLayout] = useState<number[]>([]);
  const [baseLayout, setBaseLayout] = useState<number[]>([]);

  const handleMaximizeColum = (columnName: string) => {
    const columnIndex = columns.findIndex((col) => columnName === col.selector);
    if (columnIndex === -1) return;

    setLayout((prevLayout) =>
      prevLayout.map((width, index) => {
        if (index === columnIndex) {
          const padding = 24 * 2;
          const columnWidth = localStorage.getItem(`col:${columnName}`);
          return Number(columnWidth) + padding;
        }
        return width;
      })
    );
    setOverwriteLayout(true);
  };

  const handleOnSelectAll = (state: boolean) => {
    setIsAllSelected(state);
  };

  const handleSelectRow = (isSelected: boolean, data: any) => {
    onSelect(data?.id, isSelected);
  };

  const handleUpdateLayout = (value: number, gridColumnIndex: number) => {
    setLayout((layout) => {
      const mutableLayout = [...layout];
      const minWidth = baseLayout[gridColumnIndex];
      const newWidth = mutableLayout[gridColumnIndex] + value;

      if (newWidth < minWidth) mutableLayout[gridColumnIndex] = minWidth;
      else mutableLayout[gridColumnIndex] = newWidth;
      return mutableLayout;
    });
  };

  const handleRowResize = (position: any, columnInfo: any) => {
    setOverwriteLayout(true);
    const direction = position?.x ? 'left' : 'right';
    const columnIndex =
      direction === 'left' ? Number(columnInfo?.index) - 1 : columnInfo?.index;
    handleUpdateLayout(position?.x || position?.width, columnIndex);
  };

  const handleEvaluateLayout = () => {
    const tableEl = tableRef.current;
    const currentLayout: number[] = [];

    if (tableEl) {
      for (let i = 0; i < columnTemplate.length; i++) {
        if (tableEl.children[i]) {
          const el = tableEl.children?.[i] as HTMLDivElement;
          currentLayout.push(el?.offsetWidth);
        }
      }

      setLayout(currentLayout);
    }

    return currentLayout;
  };

  // evaluate initial grid layout here
  useEffect(() => {
    const computedLayout = handleEvaluateLayout();
    if (computedLayout) setBaseLayout(computedLayout);
    window.addEventListener('resize', handleEvaluateLayout);
    return () => {
      window.removeEventListener('resize', handleEvaluateLayout);
    };
    // eslint-disable-next-line
  }, [tableRef]);

  const conditionalStyles: any = {};
  if (overwriteLayout)
    conditionalStyles.gridTemplateColumns = layout
      .map((unit) => `${unit}px`)
      .join(' ');

  return (
    <Container>
      <Table style={conditionalStyles} ref={tableRef} count={columns?.length}>
        <TableHeader
          onResize={handleRowResize}
          handleMaximizeColum={handleMaximizeColum}
          sortField={sortField}
          sortOrder={sortOrder}
          setSortField={setSortField}
          selectAll={isAllSelected}
          onSelectAll={handleOnSelectAll}
          columns={columns}
          setSortOrder={setSortOrder}
        />
        {!isLoading && (
          <>
            {data.map((item, index) => {
              return (
                <TableRow
                  onResize={handleRowResize}
                  handleMaximizeColum={handleMaximizeColum}
                  rowType={data.length - 1 === index ? 'last-row' : undefined}
                  data={item}
                  key={`table-row-${item?.id}`}
                  columns={columns}
                  selected={
                    unselectedIds?.includes(item?.id) === true
                      ? false
                      : isAllSelected || selectedIds?.includes(item?.id)
                  }
                  handleOnSelectRow={handleSelectRow}
                  onRowItemClick={() => onRowItemClick(item.id)}
                />
              );
            })}
          </>
        )}
      </Table>
      {isLoading && (
        <PreloaderWrapper>
          <Loading />
        </PreloaderWrapper>
      )}
      {!isLoading && !data.length && (
        <SVGContainer>
          <Crab height={268} width={268} fill={theme.grey.shade7} />
          <div>
            Unable to find result{' '}
            {searchTerm ? `for keyword: '${searchTerm}'` : ''}
          </div>
        </SVGContainer>
      )}
    </Container>
  );
};
