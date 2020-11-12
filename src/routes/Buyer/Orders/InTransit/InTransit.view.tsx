import React from 'react';

import Typography from 'components/base/Typography';
import OrderItemView from 'components/module/OrderItem';
import { useTheme } from 'utils/Theme';

import { OrdersGeneratedProps } from '../Orders.props';
import {
  AccordionTitleContainer,
  StyledAccordion,
  OrderBadge,
} from '../Orders.style';

const InTransit = (props: OrdersGeneratedProps) => {
  const theme = useTheme();
  const { inTransitOrders } = props;

  return (
    <>
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
