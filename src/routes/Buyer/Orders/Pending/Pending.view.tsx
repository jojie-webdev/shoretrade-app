import React, { useEffect, useState } from 'react';

import { InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import OrderItemView from 'components/module/OrderItem';
import { Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { OrderItem, OrdersGeneratedProps } from '../Orders.props';
import {
  StyledAccordion,
  OrderBadge,
  AccordionTitleContainer,
  TitleRow,
} from '../Orders.style';

const Pending = (props: OrdersGeneratedProps) => {
  const theme = useTheme();

  const { pendingOrders } = props;

  const [confirmedOrdersFormatted, setConfirmedOrdersFormatted] = useState({});
  const [pendingOrdersFormatted, setPendingOrdersFormatted] = useState({});

  useEffect(() => {
    if (pendingOrders) {
      const co: {
        [key: string]: OrderItem;
      } = {};
      const po: {
        [key: string]: OrderItem;
      } = {};

      Object.keys(pendingOrders).forEach((key) => {
        const orders = pendingOrders[key];

        orders.forEach((o) => {
          if (o.confirmed) {
            co[key] = o;
          } else {
            po[key] = o;
          }
        });
        setConfirmedOrdersFormatted(co);
        setPendingOrdersFormatted(po);
      });
    }
  }, [pendingOrders]);

  const pendingOrdersKeys = Object.keys(pendingOrdersFormatted);
  const confirmedOrdersKeys = Object.keys(confirmedOrdersFormatted);

  return (
    <>
      <TitleRow>
        <Col md={12} className="title-col">
          <div className="svg-container">
            <InfoFilled fill={theme.brand.alert} height={18} width={18} />
          </div>
          <Typography color="alert">
            Pending Confirmation - {pendingOrdersKeys.length}
          </Typography>
        </Col>
      </TitleRow>

      {pendingOrdersKeys.map((key) => (
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

      <TitleRow style={{ marginTop: '24px' }}>
        <Col md={12} className="title-col">
          <Typography color="shade6" variant="overline">
            TO SHIP - {confirmedOrdersKeys.length}
          </Typography>
        </Col>
      </TitleRow>

      {confirmedOrdersKeys.map((key) => (
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
