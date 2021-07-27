import React from 'react';

import Checkbox from 'components/base/Checkbox';
import theme from 'utils/Theme';

import { ListingCardProps } from './ListingCard.props';
import { Container } from './ListingCard.style';

export const ListingCard = (props: Partial<ListingCardProps>) => {
  const { columns, data, tableSettings, isSelected, onSelect } = props;

  return (
    <Container>
      <div>
        {columns
          ?.filter((column) => tableSettings?.includes(column?.selector))
          .map((column) => {
            return (
              <section>
                <header>{column.name}</header>
                <div>
                  {column?.component
                    ? column?.component(data)
                    : data?.[column.selector]}
                </div>
              </section>
            );
          })}
      </div>
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
