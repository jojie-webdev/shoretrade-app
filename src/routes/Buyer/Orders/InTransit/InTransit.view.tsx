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
  SearchContainer,
  SearchFilterRow,
} from '../Orders.style';

const InTransit = (props: OrdersGeneratedProps) => {
  const theme = useTheme();
  const { inTransitOrders, filters } = props;
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
      {Object.keys(inTransitOrders).map((key) => (
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
                Estimated{' '}
                {inTransitOrders[key][0].isAquafuture
                  ? 'Catchment'
                  : 'Delivery'}
                :
              </Typography>
              <Typography color="shade9">{key}</Typography>
            </AccordionTitleContainer>
          }
          rightComponent={
            <OrderBadge>
              <Typography color="shade9" variant="overline">
                {inTransitOrders[key].length}{' '}
                {inTransitOrders[key].length > 1 ? 'Orders' : 'Order'}
              </Typography>
            </OrderBadge>
          }
        >
          {inTransitOrders[key].map((d) => (
            <OrderItemView {...d} token={props.token} key={d.id} />
          ))}
        </StyledAccordion>
      ))}
    </>
  );
};

export default InTransit;
