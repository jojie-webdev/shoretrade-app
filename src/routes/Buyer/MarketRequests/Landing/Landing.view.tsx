import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import { BoxContainer } from 'components/layout/BoxContainer';
import Card from 'components/module/CategoryCards/Landing';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { Row, Col, Container } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import {
  MarketRequestsContainer,
  LoadingContainer,
  HeaderContainer,
} from './Landing.style';

const MarketRequestsLandingView = (
  props: MarketRequestsLandingGeneratedProps
) => {
  // const theme = useTheme();
  return (
    <MarketRequestsContainer>
      <BoxContainer>
        <HeaderContainer>
          <div>My Request</div>
          <Button text="CREATE MARKET REQUEST" variant="primary" size="md" />
        </HeaderContainer>
      </BoxContainer>
    </MarketRequestsContainer>
  );
};

export default MarketRequestsLandingView;
