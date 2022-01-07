import React from 'react';

import moment from 'moment';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice, capitalize } from 'utils/String';

import ListingTimeLeftView from '../ListingTimeLeft';
import { ProductDetailsCard6Props } from './ProductDetailsCard6.props';
import { Container, Row, Price, Label } from './ProductDetailsCard6.style';

const ProductDetailsCard6View = (props: ProductDetailsCard6Props) => {
  const {
    price,
    timeLeft,
    avgBoxSize,
    catchDate,
    catchRecurrence,
    minOrder,
    templateDeliveryDate,
    unit = 'kg',
    hiddenPrice,
    SellerCard,
  } = props;

  const formattedCatchDate = () => moment(catchDate).format('DD MMMM YYYY');

  return (
    <Container {...props}>
      {SellerCard ? SellerCard : <></>}
      {!hiddenPrice && (
        <div style={{ display: 'flex' }}>
          <Price variant="title5" weight="900">
            {toPrice(price)}
          </Price>
          <Label
            variant="caption"
            color="shade6"
            style={{ marginLeft: 6.5, marginTop: 8 }}
          >
            per {formatUnitToPricePerUnit(unit)}
          </Label>
        </div>
      )}
      {!props.catchRecurrence && (
        <Row>
          <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
            Time Left:
          </Label>
          <Label variant="label" weight="bold">
            <ListingTimeLeftView timeLeft={moment(timeLeft)} />
          </Label>
        </Row>
      )}
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
          {catchRecurrence ? 'Catch Frequency:' : 'Catch Date:'}
        </Label>
        <Label variant="label" weight="bold">
          {catchRecurrence ? capitalize(catchRecurrence) : formattedCatchDate()}
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

      {templateDeliveryDate && (
        <Row>
          <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
            Estimated Shipping:
          </Label>
          <Label variant="label" weight="bold">
            {' '}
            {templateDeliveryDate}
          </Label>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetailsCard6View;
