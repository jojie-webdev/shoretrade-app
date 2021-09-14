import React from 'react';

import Badge from 'components/base/Badge';
import { CheckFilled, CloseFilled, Sync } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { BadgeText } from '../Landing.style';
import {
  getExpiry,
  getStatusBadgeColor,
  isOfferMade,
  isPaymentPending,
  isPaymentRequired,
  isRedLabel,
} from '../Landing.transform';
import {
  Badges,
  BuyerRequestMobileContainer,
  MajorInfo,
  MinorInfo,
  StyledBadge,
  SubMinorDetail,
  SubMinorInfo,
} from './MobileMarketRequest.style';

const MobileMarketRequests = (props: {
  data: GetAllMarketRequestResponseItem;
  activeOffers?: GetActiveOffersRequestResponseItem[];
}): JSX.Element => {
  const { data, activeOffers } = props;
  const {
    image,
    type,
    specifications,
    weight,
    sizeOptions,
    metric,
    sizeFrom,
    sizeTo,
    shippingTo,
  } = data;

  const unit = formatMeasurementUnit(data.measurementUnit);

  const concatSpecs = () => {
    const concatenatedSpecs = specifications
      ?.map((spec) => spec.stateName)
      ?.join(', ');

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
    const sizeValue =
      sizeOptions && Object.keys(sizeOptions).length != 0
        ? sizeOptions.join(', ')
        : sizeToString(
            metric,
            (sizeFrom || '').toString(),
            (sizeTo || '').toString()
          );

    return sizeValue;
  };

  const buildQtyValue = () => {
    const qty = weight?.from + ' - ' + weight?.to + ' ' + unit;

    return qty;
  };

  const buildAddressValue = () => {
    const address =
      shippingTo?.suburb +
      ', ' +
      shippingTo?.state +
      ', ' +
      shippingTo?.postcode;

    return address;
  };

  const getOfferByMarketRequest = () => {
    const offer = activeOffers?.find(
      (offer) => offer.marketRequest.id === data.id
    );

    return offer || ({} as Offer);
  };

  const renderBadges = () => (
    <Badges>
      {isPaymentRequired(getOfferByMarketRequest().negotiations) ? (
        isPaymentPending(getOfferByMarketRequest().negotiations) ? (
          <StyledBadge className="badge" badgeColor={theme.brand.error}>
            <BadgeText
              variant="small"
              color="noshade"
              weight="900"
              style={{ lineHeight: '15px' }}
            >
              PENDING PAYMENT
            </BadgeText>
          </StyledBadge>
        ) : (
          <StyledBadge
            className="badge"
            badgeColor={getStatusBadgeColor('DECLINED')}
          >
            <BadgeText
              variant="small"
              color="noshade"
              weight="900"
              style={{ lineHeight: '15px' }}
            >
              LOST
            </BadgeText>
          </StyledBadge>
        )
      ) : (
        isOfferMade(data, activeOffers) && (
          <StyledBadge className="badge" badgeColor={theme.brand.success}>
            <BadgeText
              variant="small"
              color="noshade"
              weight="900"
              style={{ lineHeight: '15px' }}
            >
              ACTIVE OFFER
            </BadgeText>
          </StyledBadge>
        )
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
          {type}
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
            {subMinorDetail('Quantity', buildQtyValue())}
          </SubMinorDetail>

          <SubMinorDetail>
            {subMinorDetail('Shipping to', buildAddressValue())}
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
            {getExpiry(data.createdAt)}
          </Typography>
        </SubMinorDetail>

        {renderBadges()}
      </MinorInfo>
    </BuyerRequestMobileContainer>
  );
};

export default MobileMarketRequests;
