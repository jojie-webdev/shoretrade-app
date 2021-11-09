import React from 'react';

import { CheckFilled, CloseFilled, Sync } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import {
  GetActiveOffersRequestResponseItem,
  OfferStatus,
} from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { getOfferStatus } from 'utils/MarketRequest/offerStatus';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { BadgeText } from '../Landing.style';
import {
  getExpiry,
  getShippingAddress,
  getStatus,
  getStatusBadgeColor,
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
import { StyledStatusBadge } from './MobileOffers.style';
import { transformMarketRequestStatusText } from 'utils/MarketRequest/marketRequestTag';
import OfferTag from 'components/module/OfferTag';

const MobileOffers = (props: {
  data: GetActiveOffersRequestResponseItem;
  buyerRequests?: GetAllMarketRequestResponseItem[];
}): JSX.Element => {
  const { data, buyerRequests } = props;
  const {
    image,
    specifications,
    name,
    size,
    price,
    measurementUnit,
    status,
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
          <img src={parseImageUrl(image)} />
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
