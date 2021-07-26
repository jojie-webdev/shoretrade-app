import React from 'react';

import Checkbox from 'components/base/Checkbox';
import theme from 'utils/Theme';

import { ListingCardProps } from './ListingCard.props';
import { Container } from './ListingCard.style';

export const ListingCard = (props: Partial<ListingCardProps>) => {
  const { onClickCheckbox, checked, columns, data, tableSettings } = props;

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
          onClick={(event) => onClickCheckbox?.(event)}
          borderColor={theme.grey.shade7}
          size={20}
          checked={checked}
        />
      </div>
    </Container>
  );
};
