import React from 'react';

import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import moment from 'moment';
import { isEmpty, isNil } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { isRedLabel } from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatRunningDateDifference } from 'utils/MarketRequest';
import { parseImageUrl } from 'utils/parseImageURL';

import NegotiationTag from '../NegotiationTag';
import { NegotiationInteractionsProps } from './NegotiationInteractions.props';
import { Container } from './NegotiationInteractions.style';

const NegotiationInteractions = (
  props: NegotiationInteractionsProps
): JSX.Element => {
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

  const getTimeLimit = () => {
    const isFresh = !isEmpty(
      data.specifications.filter((spec) => spec.name.toLowerCase() === 'fresh')
    );
    const isPreAuction = data.is_pre_auction;
    const time = data.negotiation_offer?.updated_at || data.created_at;

    if (isFresh || isPreAuction) {
      const expiry = moment(time).add(3, 'h').isBefore()
        ? 'Expired'
        : formatRunningDateDifference(
            moment(time).add(3, 'h').format(),
            '',
            false
          ).toLowerCase();

      return expiry;
    }

    const expiry = moment(time).add(24, 'h').isBefore()
      ? 'Expired'
      : formatRunningDateDifference(
          moment(time).add(24, 'h').format(),
          '',
          false
        ).toLowerCase();

    return expiry;
  };

  const modifyTimeLimit = () => {
    const time = getTimeLimit().toLowerCase();
    let modifiedTime = '';
    const reminder = props.isMobile ? '' : ' left';
    if (data.status === 'CHECKOUT' || data.status === 'LOST') {
      return '';
    }

    if (time === 'expired') {
      return 'Expired';
    }

    if (time.includes('hours')) {
      const splits = time.split('hours');
      modifiedTime = splits[0] + `hours ${reminder}`;
    } else if (time.includes('hour')) {
      const splits = time.split('hour');
      modifiedTime = splits[0] + `hours ${reminder}`;
    } else {
      modifiedTime = time + reminder;

      if (!time) {
        modifiedTime = '';
      }
    }

    return modifiedTime;
  };

  const renderMobileData = () => {
    return (
      <Col sm={4}>
        <Row
          style={{
            padding: '5px',
            margin: 0,
            alignItems: 'center',
          }}
        >
          <img
            src={parseImageUrl(data?.thumbnail || data?.default_photo)}
            alt="default photo or thumbnail"
          />
          <Typography
            variant="caption"
            color="noshade"
            style={{ fontSize: 15 }}
          >
            {data?.name}
          </Typography>
        </Row>
        <Row
          style={{
            padding: '5px',
            margin: 0,
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" color="shade6" style={{ marginTop: 4 }}>
            {!isNil(data?.specifications) &&
              Array.isArray(data?.specifications) &&
              data?.specifications.map((s) => s.name).join(', ')}
          </Typography>
        </Row>
        <Row
          style={{
            padding: '5px',
            margin: 0,
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" color="shade6">
            Quantity{' '}
            <span
              style={{
                color: '#fff',
                marginRight: 10,
              }}
            >{`${data?.desired_quantity} ${unit}`}</span>
          </Typography>
          <Typography
            variant="caption"
            color={isRedLabel(data?.created_at) ? 'error' : 'shade6'}
          >
            Time Left{' '}
            <span
              style={{
                color: '#fff',
                marginRight: 10,
              }}
            >
              {modifyTimeLimit()}
            </span>
          </Typography>
        </Row>
        <Row
          style={{
            padding: '5px',
            margin: 0,
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" color="shade6">
            Size{' '}
            <span
              style={{
                color: '#fff',
                marginRight: 10,
              }}
            >
              {buildSizeValue()}
            </span>
          </Typography>
        </Row>
        <Row
          style={{
            padding: '5px',
            margin: 0,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex' }}>
            <NegotiationTag text={data?.display_status || ''} />
          </div>
        </Row>
      </Col>
    );
  };

  return (
    <Container>
      <Interactions
        onClick={() => onClick()}
        leftComponent={
          props.isMobile ? (
            renderMobileData()
          ) : (
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
                  {modifyTimeLimit()}
                </Typography>
              </Col>
              <Col style={{ padding: '0 5px' }}>
                <div style={{ display: 'flex' }}>
                  <NegotiationTag text={data?.display_status || ''} />
                </div>
              </Col>
            </>
          )
        }
        padding="8px 20px 8px 8px"
      />
    </Container>
  );
};

export default React.memo(NegotiationInteractions);
