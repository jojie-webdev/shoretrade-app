import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { Crab } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import CheckoutCard from 'components/module/CheckoutCard/CheckoutCard.view';
import EmptyState from 'components/module/EmptyState/EmptyState.view';
import Loading from 'components/module/Loading';
import ShippingCard from 'components/module/ShippingCard/ShippingCard.view';
import { BUYER_ROUTES } from 'consts';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { CheckoutGeneratedProps } from './Checkout.props';
import { Container, Footer } from './Checkout.style';

const MOCK_ORDER = {
  name: 'King Salmon Manuka Cold...',
  image: 'https://picsum.photos/80',
  vendor: 'Peter Manettas',
  size: '12',
  unit: 'Kg',
  type: 'Baby — Extra Large',
  price: '624.50',
  onDelete: () => {},
};

const MOCK_SHIPPING = [
  {
    priceId: 1,
    name: 'Road freight delivery to door',
    est: 'Est. delivery: 21 Apr',
    price: '22.00',
  },
  {
    priceId: 2,
    name: 'Road freight pickup at airport',
    est: 'Est. delivery: 23 Apr – 24 Apr',
    price: '84.70',
  },
];

const CheckoutView = (props: CheckoutGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Container>
      {/*<Row className="row" align="center" justify="center">*/}
      {/*  <Col>*/}
      {/*    <EmptyState*/}
      {/*      title="No orders yet"*/}
      {/*      buttonText="Start an order"*/}
      {/*      Svg={Crab}*/}
      {/*      onButtonClicked={() => history.push(BUYER_ROUTES.ROOT)}*/}
      {/*    />*/}

      {/*    <Loading label="Loading Shipping Quotes" />*/}
      {/*  </Col>*/}
      {/*</Row>*/}

      <Row>
        <Col>
          <Typography
            className="order-summary"
            variant="overline"
            color="shade6"
          >
            ORDER SUMMARY
          </Typography>

          <CheckoutCard {...MOCK_ORDER} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Typography
            className="checkout-shipping"
            variant="overline"
            color="shade6"
          >
            Shipping
          </Typography>

          <ShippingCard
            selectedPriceId={1}
            options={MOCK_SHIPPING}
            onPress={(option) => {
              console.log(option);
            }}
          />
        </Col>
      </Row>

      <Footer>
        <Typography color="shade6">Total</Typography>
        <Typography variant="title5" color="shade8" weight="900">
          $8,462.00
        </Typography>
        <div className="footer-separator">
          <div className="keep-shopping-wrapper">
            <Button text="Keep Shopping" variant="outline" />
          </div>

          <Button text="Place Order" />
        </div>
      </Footer>
    </Container>
  );
};

export default CheckoutView;
