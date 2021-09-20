import React from 'react';

import Typography from 'components/base/Typography';
import { TypographyProps } from 'components/base/Typography/Typography.props';
import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { getOfferStatus } from 'utils/MarketRequest/offerStatus';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { BadgeText } from '../Landing.style';
import {
  getExpiry,
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

  const getOfferCount = () => {
    const offer = getOfferByMarketRequest();

    const initialOffer = 1;
    const totalOfferAndNegos = initialOffer + offer?.negotiations?.length;

    return totalOfferAndNegos;
  };

  const statusTag = (
    badgeColor: string,
    badgeTextColor: TypographyProps['color'],
    text: string
  ) => (
    <StyledBadge className="badge" badgeColor={badgeColor}>
      <BadgeText
        variant="small"
        color={badgeTextColor}
        weight="900"
        style={{ lineHeight: '15px' }}
      >
        {text}
      </BadgeText>
    </StyledBadge>
  );

  const renderTagByStatus = () => {
    const offerStatus = getOfferStatus(getOfferByMarketRequest(), 'seller');

    if (offerStatus === 'NEW OFFER') {
      return statusTag(theme.brand.success, 'noshade', 'ACTIVE OFFER');
    }
  };

  const getCorrectOfferCountLabel = () => {
    const offerCount = getOfferCount();

    if (offerCount === 1) {
      return '1 OFFER';
    } else {
      return offerCount + ' OFFERS';
    }
  };

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

        <Badges>
          {renderTagByStatus()}
          {getOfferCount() &&
            statusTag(
              theme.grey.shade3,
              'shade10',
              getCorrectOfferCountLabel()
            )}
        </Badges>
      </MinorInfo>
    </BuyerRequestMobileContainer>
  );
};

export default MobileMarketRequests;
