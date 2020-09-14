import React from 'react';

import Typography from 'components/base/Typography';
import ProductDetailCard from 'components/module/ProductDetailCard';
import { useTheme } from 'utils/Theme';

import { OrderAccordionItemProps } from './OrderAccordionContent.props';
import {
  Container,
  ValuesColumn,
  Value,
  OrderNumber,
  Row,
  HorizontalRule,
  OrderValue,
  OrderContainer,
  SeafoodName,
  Right,
  Total,
  ShippingCost,
  Shipping,
  ShippingContainer,
} from './OrderAccordionContent.style';

const OrderAccordionContent = ({
  orderNumber,
  seller,
  orderedBy,
  shippingOption,
  shippingPrice,
  total,
  detailsProps,
}: OrderAccordionItemProps) => {
  const theme = useTheme();

  return (
    <>
      <HorizontalRule />
      <Container key={orderNumber}>
        <ValuesColumn>
          <OrderContainer>
            <OrderValue variant="overline" color="shade6">
              ORDER
            </OrderValue>
            <OrderNumber>#{orderNumber}</OrderNumber>
          </OrderContainer>
          <Value>
            <Typography variant="body" color="shade6">
              Seller:
            </Typography>
            <Typography
              style={{ marginLeft: '4px' }}
              color="shade8"
              variant="body"
              weight="500"
            >
              {seller}
            </Typography>
          </Value>
          <Value>
            <Typography variant="body" color="shade6">
              Ordered By:
            </Typography>
            <Typography
              style={{ marginLeft: '4px' }}
              color="shade8"
              variant="body"
              weight="bold"
            >
              {orderedBy}
            </Typography>
          </Value>
        </ValuesColumn>

        {detailsProps.map((data) => (
          <ProductDetailCard {...data} />
        ))}

        <HorizontalRule />
        <Row>
          <ShippingContainer>
            <Typography variant="body" color="shade6">
              {shippingOption}
            </Typography>
            <ShippingCost color="shade9" variant="body" weight="bold">
              +${shippingPrice}
            </ShippingCost>
          </ShippingContainer>
        </Row>
        <Row>
          <Value>
            <Typography variant="body" color="shade6">
              Total
            </Typography>
            <Total color="shade9" variant="body" weight="bold">
              ${total}
            </Total>
          </Value>
        </Row>
      </Container>
    </>
  );
};

export default OrderAccordionContent;
