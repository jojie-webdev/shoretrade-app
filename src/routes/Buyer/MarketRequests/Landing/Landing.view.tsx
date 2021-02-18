import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import { BoxContainer } from 'components/layout/BoxContainer';
import Card from 'components/module/CategoryCards/Landing';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { useHistory, Link } from 'react-router-dom';
import theme from 'utils/Theme';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import {
  MarketRequestsContainer,
  MarketRequestItemContainer,
  MarketRequestItemInteraction,
  LoadingContainer,
  StyledAlert,
  BadgeText,
} from './Landing.style';

export const MarketRequestItem = (props: {
  expiry: string;
  offersTotal: number;
  type: string;
  image: string;
  inDetail: boolean;
}) => {
  const { inDetail, expiry, offersTotal, type, image } = props;
  const offersText = `${offersTotal} Offers`;

  const offers = () => {
    if (inDetail) return '';

    if (offersTotal >= 12) {
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
        {offers()}
      </div>
    </MarketRequestItemContainer>
  );
};

const MarketRequestsLandingView = (
  props: MarketRequestsLandingGeneratedProps
) => {
  const history = useHistory();
  const { marketRequests, onClickItem } = props;

  return (
    <MarketRequestsContainer>
      <BoxContainer>
        <Row nogutter justify="around" align="center" className="header">
          <Col>
            <Typography>My Requests</Typography>
          </Col>
          <Col xs="content">
            <Button text="CREATE MARKET REQUEST" variant="primary" size="md" />
          </Col>
        </Row>
        <StyledAlert
          content={'All offers below are including the shipping cost'}
          variant="alert"
          alignText="center"
          fullWidth
        />
        {marketRequests.map((mr) => (
          <MarketRequestItemInteraction
            key={mr.id}
            onClick={() => onClickItem(mr)}
            leftComponent={
              <MarketRequestItem
                inDetail={false}
                image={mr.image}
                offersTotal={mr.offersTotal}
                expiry={mr.expiry}
                type={mr.type}
              />
            }
          />
        ))}
      </BoxContainer>
    </MarketRequestsContainer>
  );
};

export default MarketRequestsLandingView;
