import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Card from 'components/module/CategoryCards/Landing';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { Link } from 'react-router-dom';
import theme from 'utils/Theme';

import { MarketRequestItem } from '../Landing/Landing.view';
import { MarketRequestDetailProps } from './RequestDetails.prop';
import {
  RequestDetailsContainer,
  HeaderContainer,
} from './RequestDetails.style';

const MarketRequestDetailView = (props: MarketRequestDetailProps) => {
  const { data } = props;

  return (
    <RequestDetailsContainer>
      <BoxContainer>
        <HeaderContainer>
          <div>
            <Breadcrumbs
              sections={[
                { label: 'My Requests', link: BUYER_ROUTES.MARKET_REQUESTS },
                {
                  label: 'Request Details',
                  link: BUYER_ROUTES.MARKET_REQUEST_DETAILS(),
                },
              ]}
            />
          </div>
        </HeaderContainer>
      </BoxContainer>
    </RequestDetailsContainer>
  );
};

export default MarketRequestDetailView;
