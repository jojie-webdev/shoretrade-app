import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';
import { Filter, Crab } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import { BoxContainer } from 'components/layout/BoxContainer';
import Card from 'components/module/CategoryCards/Landing';
import EmptyStateView from 'components/module/EmptyState';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { useHistory, Link } from 'react-router-dom';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import theme from 'utils/Theme';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import {
  MarketRequestsContainer,
  MarketRequestItemContainer,
  MarketRequestItemInteraction,
  LoadingContainer,
  SizeTextContainer,
  StyledAlert,
  BadgeText,
} from './Landing.style';

export const MarketRequestItem = (props: {
  expiry: string;
  offers: number;
  type: string;
  image: string;
  inDetail: boolean;
  weight?: { from: number; to: number };
  measurementUnit?: string;
}) => {
  const {
    inDetail,
    expiry,
    offers,
    type,
    image,
    measurementUnit,
    weight,
  } = props;
  const offersText = `${offers} Offers`;

  const offersMarkup = () => {
    if (inDetail) return '';

    if (offers >= 12) {
      return (
        <Badge className="offers-badge" badgeColor={theme.brand.success}>
          <BadgeText color="shade1" weight="bold" variant="overline">
            {offersText}
          </BadgeText>
        </Badge>
      );
    } else {
      return (
        <Badge className="offers-badge" badgeColor={theme.grey.shade3}>
          <BadgeText color="shade8" weight="bold" variant="overline">
            {offersText}
          </BadgeText>
        </Badge>
      );
    }
  };

  return (
    <MarketRequestItemContainer>
      <div className="thumbnail-container">
        <img src={image} />
      </div>
      <div className="info-container">
        <TypographyView variant="body">{type}</TypographyView>
        {weight && measurementUnit ? (
          <SizeTextContainer>
            <TypographyView variant="body">{weight?.from}</TypographyView>
            <TypographyView variant="body" color="shade6">
              <span className="over-divider">/</span>
              {weight?.to} {formatMeasurementUnit(measurementUnit)}
            </TypographyView>
          </SizeTextContainer>
        ) : (
          ''
        )}
        {expiry === 'Expired' ? (
          <TypographyView
            style={{ fontStyle: 'italic' }}
            color="error"
            className="time"
          >
            {expiry}
          </TypographyView>
        ) : (
          <TypographyView color="shade6" className="time">
            {expiry}
          </TypographyView>
        )}
        {offersMarkup()}
      </div>
    </MarketRequestItemContainer>
  );
};

const MarketRequestsLandingView = (
  props: MarketRequestsLandingGeneratedProps
) => {
  const history = useHistory();
  const { marketRequests, onClickItem } = props;
  console.log(marketRequests);
  return (
    <MarketRequestsContainer>
      <BoxContainer>
        <Row nogutter justify="around" align="center" className="header">
          <Col>
            <Typography>My Requests</Typography>
          </Col>
          <Col xs="content">
            <Button
              onClick={() => history.push(BUYER_ROUTES.CREATE_MARKET_REQUEST)}
              text="CREATE MARKET REQUEST"
              variant="primary"
              size="md"
            />
          </Col>
        </Row>
        <StyledAlert
          content={'All offers below are including the shipping cost'}
          variant="alert"
          alignText="center"
          fullWidth
        />
        {marketRequests.length > 0 ? (
          marketRequests.map((mr) => (
            <MarketRequestItemInteraction
              key={mr.id}
              onClick={() => onClickItem(mr)}
              leftComponent={
                <MarketRequestItem
                  inDetail={false}
                  image={mr.image}
                  offers={mr.offers}
                  expiry={mr.expiry}
                  type={mr.type}
                />
              }
            />
          ))
        ) : (
          <EmptyStateView
            // circleHeight={280}
            // circleWidth={280}
            Svg={Crab}
            height={240}
            width={249}
            fluid
          />
        )}
      </BoxContainer>
    </MarketRequestsContainer>
  );
};

export default MarketRequestsLandingView;
