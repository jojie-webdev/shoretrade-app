import React from 'react';

import Typography from 'components/base/Typography';
import OfferTag from 'components/module/OfferTag';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { transformMarketRequestStatusText } from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';

import {
  getExpiry,
  getShippingAddress,
  isRedLabel,
} from '../Landing.transform';
import {
  Badges,
  BuyerRequestMobileContainer,
  MajorInfo,
  MinorInfo,
  SubMinorDetail,
  SubMinorInfo,
} from '../MobileMarketRequest/MobileMarketRequest.style';

const MobileOffers = (props: {
  data: GetActiveOffersRequestResponseItem;
  buyerRequests?: GetAllMarketRequestResponseItem[];
}): JSX.Element => {
  const { data } = props;
  const {
    image,
    specifications,
    name,
    size,
    price,
    measurementUnit,
    marketRequest,
  } = data;

  const statusTextProps = transformMarketRequestStatusText(
    data.statusText,
    true
  );

  const sizeUnit = formatMeasurementUnit(measurementUnit) === 'kg' ? 'kg' : '';

  const concatSpecs = () => {
    const concatenatedSpecs = specifications.join(', ');

    return concatenatedSpecs;
  };

  const subMinorDetail = (label: string, value: string) => (
    <>
      <Typography
        variant="caption"
        weight="400"
        color="shade6"
        style={{ marginRight: '5px' }}
      >
        {label}{' '}
      </Typography>
      <Typography variant="caption" weight="700" color="noshade">
        {value}
      </Typography>
    </>
  );

  const buildSizeValue = () => {
    let sizeFrom = !size.from ? 'Ungraded' : size.from + '' + sizeUnit;

    if (sizeFrom.toLowerCase().includes('small')) {
      sizeFrom = 'Small';
    }
    if (sizeFrom.toLowerCase().includes('medium')) {
      sizeFrom = 'Medium';
    }
    if (sizeFrom.toLowerCase().includes('large')) {
      sizeFrom = 'Large';
    }

    return sizeFrom;
  };
  let latestOfferPrice = price;

  if (data.negotiations.length > 0) {
    const latestSellerOffer = data.negotiations.filter(
      (n) => n.type === 'NEW_OFFER'
    )[0];
    if (latestSellerOffer) {
      latestOfferPrice = latestSellerOffer.price;
    }
  }

  const buildPriceValue = () => {
    const priceValue = `$${latestOfferPrice}/${formatMeasurementUnit(
      measurementUnit
    )}`;

    return priceValue;
  };

  const buildQtyValue = `${data.weight} ${formatMeasurementUnit(
    measurementUnit
  )}`;

  const renderBadges = () => (
    <Badges>
      {statusTextProps.text !== '' && (
        <OfferTag
          text={statusTextProps.text}
          badgeColor={statusTextProps.badgeColor || ''}
          variantColor={statusTextProps.variantColor}
          color={statusTextProps.tagColor}
        />
      )}
    </Badges>
  );

  return (
    <BuyerRequestMobileContainer>
      <MajorInfo>
        <div className="thumbnail-container">
          <img src={parseImageUrl(image)} alt="" />
        </div>

        <Typography
          variant="label"
          color="noshade"
          style={{ lineHeight: '20px' }}
        >
          {name}
        </Typography>
      </MajorInfo>

      <MinorInfo>
        <Typography variant="caption" weight="400" color="shade6">
          {concatSpecs()}
        </Typography>

        <SubMinorInfo>
          <SubMinorDetail>
            {subMinorDetail('Size', buildSizeValue())}
          </SubMinorDetail>

          <SubMinorDetail>
            {subMinorDetail('Price', buildPriceValue())}
          </SubMinorDetail>

          <SubMinorDetail>
            {subMinorDetail('Qty', buildQtyValue)}
          </SubMinorDetail>
          <SubMinorDetail>
            {subMinorDetail('Shipping to', getShippingAddress(data.shippingTo))}
          </SubMinorDetail>
        </SubMinorInfo>

        <SubMinorDetail>
          <Typography
            variant="caption"
            weight="400"
            color="shade6"
            style={{ marginRight: '5px' }}
          >
            Time Left{' '}
          </Typography>
          <Typography
            variant="caption"
            weight="700"
            color={isRedLabel(data.createdAt) ? 'error' : 'noshade'}
          >
            {getExpiry(marketRequest.createdAt)}
          </Typography>
        </SubMinorDetail>

        {renderBadges()}
      </MinorInfo>
    </BuyerRequestMobileContainer>
  );
};

export default MobileOffers;
