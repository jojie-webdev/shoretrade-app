import React from 'react';

import Interactions from 'components/base/Interactions';
import { TrashCan } from 'components/base/SVG';
import Tag from 'components/base/Tag';
import Typography from 'components/base/Typography';
import { isNil } from 'ramda';
import { Col } from 'react-grid-system';
import {
  getExpiry,
  isRedLabel,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import NegotiationTag from '../NegotiationTag';
import { NegotiationInteractionsProps } from './NegotiationInteractions.props';
import { Container, TrashCanContainer } from './NegotiationInteractions.style';

const NegotiationInteractions = (
  props: NegotiationInteractionsProps
): JSX.Element => {
  const theme = useTheme();
  const { onClick, data } = props;
  const unit = formatMeasurementUnit(data.measurement_unit);

  // const buildSizeValue = () => {
  //   const sizeValue =
  //     data.sizeOptions && Object.keys(data.sizeOptions).length !== 0
  //       ? data.sizeOptions.join(', ')
  //       : sizeToString(
  //           data.metric,
  //           (data.sizeFrom || '').toString(),
  //           (data.sizeTo || '').toString()
  //         );

  //   return sizeValue;
  // };

  const buildSizeValue = () => {
    const size = sizeToString(
      data.metric || data.measurement_unit || 'Grams',
      data.size_from || '',
      data.size_to || ''
    );

    return size;
  };

  return (
    <Container>
      <Interactions
        onClick={() => onClick()}
        leftComponent={
          <>
            <img
              src={parseImageUrl(data.thumbnail || data.default_photo)}
              alt="default photo or thumbnail"
            />
            <Col style={{ padding: '0 5px' }}>
              <Typography
                variant="caption"
                color="noshade"
                style={{ fontSize: 15 }}
              >
                {data.name}
              </Typography>
              <Typography
                variant="caption"
                color="shade6"
                style={{ marginTop: 4 }}
              >
                {!isNil(data.specifications) &&
                  Array.isArray(data.specifications) &&
                  data.specifications.map((s) => s.name).join(', ')}
              </Typography>
            </Col>
            <Col style={{ padding: '0 5px' }}>
              <Typography variant="caption" color="shade6">
                Size: {buildSizeValue()}
              </Typography>
              <Typography
                variant="caption"
                color="shade6"
                style={{ marginTop: 4 }}
              >
                Qty: {`${data.desired_quantity}${unit}`}
              </Typography>
            </Col>
            <Col style={{ padding: '0 5px' }}>
              <Typography
                variant="caption"
                color={isRedLabel(data.created_at) ? 'error' : 'shade6'}
              >
                {getExpiry(data.created_at)}
              </Typography>
            </Col>
            <Col style={{ padding: '0 5px' }}>
              <div style={{ display: 'flex' }}>
                <NegotiationTag text={data.display_status} />
              </div>
            </Col>
            <Col style={{ padding: '0 5px' }}>
              <TrashCanContainer
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('TrashcanContainer > clicked');
                }}
              >
                <div
                  style={{
                    backgroundColor: theme.grey.shade8,
                    padding: '5px 8px',
                    borderRadius: 8,
                  }}
                >
                  <TrashCan fill={theme.grey.shade7} width={16} height={16} />
                </div>
              </TrashCanContainer>
            </Col>
          </>
        }
        padding="8px 20px 8px 8px"
      />
    </Container>
  );
};

export default React.memo(NegotiationInteractions);
