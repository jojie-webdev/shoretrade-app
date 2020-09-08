import React from 'react';

import Typography from 'components/base/Typography';
import moment from 'moment';
import { toPrice } from 'utils/String/toPrice';

import { ProductDetailsCard6Props } from './ProductDetailsCard6.props';
import {
  Container,
  Row,
  Price,
  Label,
  Value,
} from './ProductDetailsCard6.style';

const ProductDetailsCard6View = (props: ProductDetailsCard6Props) => {
  const {
    price,
    timeLeft,
    avgBoxSize,
    catchDate,
    minOrder,
    unit = 'Kg',
  } = props;

  const formattedTimeLeft = () => moment().to(timeLeft);
  const formattedCatchDate = () => moment(catchDate).format('DD MMMM YYYY');

  return (
    <Container {...props}>
      <Row>
        <Price variant="title5" weight="bold">
          {toPrice(price)}
        </Price>
        <Label
          variant="label"
          color="shade6"
          style={{ marginLeft: 4, marginTop: 4 }}
        >
          per kg
        </Label>
      </Row>
      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Time Left:
        </Label>
        {timeLeft && formattedTimeLeft()}
      </Row>
      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Average Box Size:
        </Label>
        {avgBoxSize} {unit}
      </Row>

      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Catch Date:
        </Label>
        {catchDate && formattedCatchDate()}
      </Row>

      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Minimum Order:
        </Label>
        {minOrder} {unit}
      </Row>
    </Container>
  );
};

export default ProductDetailsCard6View;
