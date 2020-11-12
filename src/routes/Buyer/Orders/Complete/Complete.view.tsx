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

const Complete = (props: OrdersGeneratedProps) => {
  const { completedOrders } = props;
  const theme = useTheme();

  return (
    <>
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
