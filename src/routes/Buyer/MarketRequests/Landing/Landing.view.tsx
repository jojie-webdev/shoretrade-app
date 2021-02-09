import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Card from 'components/module/CategoryCards/Landing';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { Row, Col, Container } from 'react-grid-system';
import { Link } from 'react-router-dom';
import theme from 'utils/Theme';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import {
  MarketRequestsContainer,
  MarketRequestItemContainer,
  MarketRequestItemInteraction,
  LoadingContainer,
  StyledAlert,
  HeaderContainer,
  BadgeText,
} from './Landing.style';

const MarketRequestItem = (props: {
  timeRemaining: string;
  offersTotal: number;
  name: string;
  thumbnail: string;
}) => {
  const { timeRemaining, offersTotal, name, thumbnail } = props;

  const offersText = `${offersTotal} Offers`;

  return (
    <MarketRequestItemContainer>
      <div className="thumbnail-container">
        <img src={thumbnail} />
      </div>
      <div className="info-container">
        <TypographyView variant="body">{name}</TypographyView>
        {props.timeRemaining === '0' ? (
          <TypographyView
            style={{ fontStyle: 'italic' }}
            color="error"
            className="time"
          >
            Expired
          </TypographyView>
        ) : (
          <TypographyView color="shade6" className="time">
            {timeRemaining}
          </TypographyView>
        )}
        {props.offersTotal >= 12 ? (
          <Badge className="offers-badge" badgeColor={theme.brand.success}>
            <BadgeText color="shade1" weight="bold" variant="overline">
              {offersText}
            </BadgeText>
          </Badge>
        ) : (
          <Badge className="offers-badge" badgeColor={theme.grey.shade3}>
            <BadgeText color="shade8" weight="bold" variant="overline">
              {offersText}
            </BadgeText>
          </Badge>
        )}
      </div>
    </MarketRequestItemContainer>
  );
};

const MarketRequestsLandingView = (
  props: MarketRequestsLandingGeneratedProps
) => {
  const { marketRequests } = props;

  return (
    <MarketRequestsContainer>
      <BoxContainer>
        <HeaderContainer>
          <div>My Request</div>
          <Button text="CREATE MARKET REQUEST" variant="primary" size="md" />
        </HeaderContainer>
        <StyledAlert
          content={'All offers below are including the shipping cost'}
          variant="alert"
          alignText="center"
          fullWidth
        />
        {marketRequests.map((mr) => (
          <MarketRequestItemInteraction
            key={mr.id}
            leftComponent={
              <MarketRequestItem
                thumbnail={mr.thumbnail}
                offersTotal={mr.offersTotal}
                timeRemaining={mr.timeRemaining}
                name={mr.name}
              />
            }
          />
        ))}
      </BoxContainer>
    </MarketRequestsContainer>
  );
};

export default MarketRequestsLandingView;
