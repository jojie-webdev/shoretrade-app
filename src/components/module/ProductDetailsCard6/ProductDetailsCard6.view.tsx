import React from 'react';

import moment from 'moment';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { ProductDetailsCard6Props } from './ProductDetailsCard6.props';
import { Container, Row, Price, Label } from './ProductDetailsCard6.style';

const ProductDetailsCard6View = (props: ProductDetailsCard6Props) => {
  const {
    price,
    timeLeft,
    avgBoxSize,
    catchDate,
    minOrder,
    unit = 'kg',
    hiddenPrice,
    SellerCard,
  } = props;

  const formattedTimeLeft = () => moment().to(timeLeft);
  const formattedCatchDate = () => moment(catchDate).format('DD MMMM YYYY');

  return (
    <Container {...props}>
      {SellerCard ? SellerCard : <></>}
      {!hiddenPrice && (
        <Row>
          <Price variant="title5" weight="900">
            {toPrice(price)}
          </Price>
          <Label
            variant="caption"
            color="shade6"
            style={{ marginLeft: 6.5, marginTop: 8 }}
          >
            per {formatUnitToPricePerUnit(formatMeasurementUnit(unit))}
          </Label>
        </Row>
      )}
      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Time Left:
        </Label>
        <Label variant="label" weight="bold">
          {timeLeft && formattedTimeLeft()}
        </Label>
      </Row>
      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Average Box Size:
        </Label>
        <Label variant="label" weight="bold">
          {avgBoxSize} {unit}
        </Label>
      </Row>

      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Catch Date:
        </Label>
        <Label variant="label" weight="bold">
          {catchDate && formattedCatchDate()}
        </Label>
      </Row>

      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Minimum Order:
        </Label>
        <Label variant="label" weight="bold">
          {' '}
          {minOrder} {unit}
        </Label>
      </Row>
    </Container>
  );
};

export default ProductDetailsCard6View;
