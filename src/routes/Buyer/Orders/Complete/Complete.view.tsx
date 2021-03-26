import React, { useState } from 'react';

import Typography from 'components/base/Typography';
import DateRangePicker from 'components/module/DateRangePicker';
import OrderItemView from 'components/module/OrderItem';
import Search from 'components/module/Search';
import { useTheme } from 'utils/Theme';

import { OrdersGeneratedProps } from '../Orders.props';
import {
  AccordionTitleContainer,
  StyledAccordion,
  OrderBadge,
  SearchFilterRow,
  SearchContainer,
} from '../Orders.style';

const Complete = (props: OrdersGeneratedProps) => {
  const { completedOrders, updateFilters, filters } = props;
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState('');

  const onDatesChange = () => {
    console.log('dateChanged');
  };

  return (
    <>
      <SearchFilterRow>
        <SearchContainer>
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            resetValue={() => setSearchValue('')}
            placeholder="Search by order#, product type & seller..."
            rounded
          />
        </SearchContainer>

        <DateRangePicker
          startDate={filters.pendingOrdersFilter.dateFrom}
          endDate={filters.pendingOrdersFilter.dateTo}
          onDatesChange={onDatesChange}
          format="D MMM YYYY"
        />
      </SearchFilterRow>
      {Object.keys(completedOrders).map((key) => (
        <StyledAccordion
          key={key}
          title={''}
          padding="24px"
          marginBottom="16px"
          keepIcon
          iconColor={theme.brand.primary}
          leftComponent={
            <AccordionTitleContainer>
              <Typography color="shade7" className="title">
                Date Delivered:
              </Typography>
              <Typography color="shade9">{key}</Typography>
            </AccordionTitleContainer>
          }
          rightComponent={
            <OrderBadge>
              <Typography color="shade9" variant="overline">
                {completedOrders[key].length}{' '}
                {completedOrders[key].length > 1 ? 'Orders' : 'Order'}
              </Typography>
            </OrderBadge>
          }
        >
          {completedOrders[key].map((d) => (
            <OrderItemView {...d} token={props.token} key={d.id} />
          ))}
        </StyledAccordion>
      ))}
    </>
  );
};

export default Complete;
