import React from 'react';

import Checkbox from 'components/base/Checkbox';
import { findIndex } from 'ramda';
import theme from 'utils/Theme';

import { ListingCardProps } from './ListingCard.props';
import {
  Container,
  DetailsContainer,
  ColumnGroupContainer,
  Column,
} from './ListingCard.style';

function groupColumns(colums: any[], groups: string[][]) {
  const mutableData: any[] = [...colums];

  const _group = groups.map((group) => {
    return group.map((key) => {
      const columnIndex = findIndex(
        (col: any) => col?.selector === key,
        mutableData
      );

      if (columnIndex !== -1) {
        const column = { ...mutableData?.[columnIndex] };
        // remove from the data
        mutableData.splice(columnIndex, 1);
        return column;
      }

      return {};
    });
  });

  return [...mutableData.map((col) => [col]), ..._group];
}

export const ListingCard = (props: Partial<ListingCardProps>) => {
  const {
    columns = [],
    data,
    tableSettings,
    isSelected,
    onSelect,
    last,
    groups = [],
  } = props;

  const groupedColumn = groupColumns(columns, groups);

  return (
    <Container last={last}>
      <DetailsContainer>
        {groupedColumn.map((columns, groupColumnIndex) => {
          return (
            <ColumnGroupContainer key={`group-${groupColumnIndex}`}>
              {columns
                ?.filter((column) => tableSettings?.includes(column?.selector))
                .map((column, index) => {
                  return (
                    <Column key={`group-${groupColumnIndex}-${index}`}>
                      <header>{column.name}</header>
                      <div>
                        {column?.component
                          ? column?.component(data)
                          : data?.[column.selector]}
                      </div>
                    </Column>
                  );
                })}
            </ColumnGroupContainer>
          );
        })}
      </DetailsContainer>
      <div>
        <Checkbox
          onClick={() => onSelect?.(!!isSelected)}
          borderColor={theme.grey.shade7}
          size={20}
          checked={isSelected}
        />
      </div>
    </Container>
  );
};
