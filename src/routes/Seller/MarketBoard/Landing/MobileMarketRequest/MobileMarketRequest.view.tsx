import React from 'react';

import Typography from 'components/base/Typography';
import OfferTag from 'components/module/OfferTag';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { getExpiry, isRedLabel } from '../Landing.transform';
import {
  Badges,
  BuyerRequestMobileContainer,
  MajorInfo,
  MinorInfo,
  SubMinorDetail,
  SubMinorInfo,
} from './MobileMarketRequest.style';

const MobileMarketRequests = (props: {
  data: GetAllMarketRequestResponseItem;
  activeOffers?: GetActiveOffersRequestResponseItem[];
}): JSX.Element => {
  const { data } = props;
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
      sizeOptions && Object.keys(sizeOptions).length !== 0
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

  const renderTagByStatus = () => {
    if (data.offers > 0) {
      return (
        <OfferTag
          text="Active Offers"
          badgeColor={theme.brand.success}
          variantColor="success"
          color="noshade"
        />
      );
    }
  };

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

        <Badges>{renderTagByStatus()}</Badges>
      </MinorInfo>
    </BuyerRequestMobileContainer>
  );
};

export default MobileMarketRequests;
