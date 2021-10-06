import React from 'react';

import { Cross7 } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { sizeToString } from 'utils/Listing';

// import { useTheme } from 'utils/Theme';
import { MarketRequestSummaryProps } from './MarketRequestSummary.props';
import {
  Container,
  DetailsContentContainer,
  DetailsDataContainer,
  DetailsHeaderContainer,
} from './MarketRequestSummary.style';

const MarketRequestSummary = (
  props: MarketRequestSummaryProps
): JSX.Element => {
  // const theme = useTheme();
  const { specs, sizeTo, sizeFrom, metric, weight, measurementUnit } = props;

  const renderSpecs = () =>
    specs && (
      <DetailsContentContainer>
        <Typography
          color="shade6"
          variant="label"
          style={{
            marginBottom: 10,
            fontFamily: 'Wilderness',
            fontSize: 24,
          }}
        >
          Specs:
        </Typography>
        <DetailsDataContainer>
          <Cross7 />
          <Typography
            color="shade9"
            variant="label"
            style={{
              fontFamily: 'Wilderness',
              fontSize: 38,
              marginLeft: 8.5,
              marginTop: -8,
            }}
          >
            {specs.toString().split(',').join(', ')}
          </Typography>
        </DetailsDataContainer>
      </DetailsContentContainer>
    );

  const renderSize = () => {
    const _sizeFromSizeToString = sizeToString(
      metric,
      sizeFrom?.toString(),
      sizeTo?.toString()
    );

    const getSizeFromData = () => {
      // if (
      //   _size?.options &&
      //   Array.isArray(_size?.options) &&
      //   _size?.options?.length > 0
      // ) {
      //   return Array.isArray(_size?.options) ? _size?.options?.join(', ') : '';
      // } else {
      //   return _sizeFromSizeToString;
      // }

      return _sizeFromSizeToString;
    };

    return (
      <DetailsContentContainer>
        <Typography
          color="shade6"
          variant="label"
          style={{
            marginBottom: 10,
            fontFamily: 'Wilderness',
            fontSize: 24,
          }}
        >
          Size:
        </Typography>
        <DetailsDataContainer>
          <Cross7 />
          <Typography
            color="shade9"
            variant="label"
            style={{
              fontFamily: 'Wilderness',
              fontSize: 38,
              marginLeft: 8.5,
              marginTop: -8,
            }}
          >
            {getSizeFromData()}
          </Typography>
        </DetailsDataContainer>
      </DetailsContentContainer>
    );
  };

  const renderQuantity = () => {
    return (
      <DetailsContentContainer>
        <Typography
          color="shade6"
          variant="label"
          style={{
            marginBottom: 10,
            fontFamily: 'Wilderness',
            fontSize: 24,
          }}
        >
          Quantity:
        </Typography>
        <DetailsDataContainer>
          <Cross7 />
          <Typography
            color="shade9"
            variant="label"
            style={{
              fontFamily: 'Wilderness',
              fontSize: 38,
              marginLeft: 8.5,
              marginTop: -8,
            }}
          >
            {weight?.from} {measurementUnit.toLowerCase()} - {weight?.to}{' '}
            {measurementUnit.toLowerCase()}
          </Typography>
        </DetailsDataContainer>
      </DetailsContentContainer>
    );
  };

  return (
    <Container>
      <DetailsHeaderContainer>
        <Typography
          style={{
            marginBottom: 8,
            fontFamily: 'Wilderness',
            fontSize: 24,
          }}
          weight="400"
          color="shade9"
        >
          Summary
        </Typography>
      </DetailsHeaderContainer>

      {renderSpecs()}
      <div style={{ marginTop: '20px' }}></div>
      {renderSize()}
      <div style={{ marginTop: '20px' }}></div>
      {renderQuantity()}
    </Container>
  );
};

export default React.memo(MarketRequestSummary);
