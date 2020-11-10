import React from 'react';

import Typography from 'components/base/Typography';
import OrderItemView from 'components/module/OrderItem';
import { useTheme } from 'utils/Theme';

import { OrdersGeneratedProps } from '../Orders.props';
import {
  StyledAccordion,
  OrderBadge,
  AccordionTitleContainer,
} from '../Orders.style';

const Pending = (props: OrdersGeneratedProps) => {
  const theme = useTheme();

  const { pendingOrders } = props;

  return (
    <>
      {Object.keys(pendingOrders).map((key) => (
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
                {pendingOrders[key][0].isAquafuture ? 'Catchment' : 'Delivery'}:
              </Typography>
              <Typography color="shade9">{key}</Typography>
            </AccordionTitleContainer>
          }
          rightComponent={
            <OrderBadge>
              <Typography color="shade9" variant="overline">
                {pendingOrders[key].length}{' '}
                {pendingOrders[key].length > 1 ? 'Orders' : 'Order'}
              </Typography>
            </OrderBadge>
          }
        >
          {pendingOrders[key].map((d) => (
            <OrderItemView {...d} token={props.token} key={d.id} />
          ))}
        </StyledAccordion>
      ))}
    </>
  );
};

export default Pending;
