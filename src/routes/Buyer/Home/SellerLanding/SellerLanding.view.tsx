import React from 'react';

import Interactions from 'components/base/Interactions';
import { PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search';
import SellerCard from 'components/module/SellerCard';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { SellerLandingGeneratedProps } from './SellerLanding.props';
import {
  PreviewContainer,
  SellerContainer,
  Image,
  PlaceholderImage,
} from './SellerLanding.style';

const SellerLanding = (props: SellerLandingGeneratedProps) => {
  const history = useHistory();
  const { results, onChangeSearchValue, search } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <PreviewContainer>
      {isSmallScreen && <MobileHeader>Sellers</MobileHeader>}

      <Row nogutter>
        <Col xs={12}>
          <Search
            placeholder="Search for a Seller"
            value={search}
            onChange={onChangeSearchValue}
            rounded={isSmallScreen}
          />
        </Col>
      </Row>
      {results.length > 0 ? (
        <SellerContainer>
          {isSmallScreen ? (
            <>
              {results.map((s) => {
                return (
                  <Interactions
                    key={s.id}
                    padding="8px 24px 8px 8px"
                    onClick={() => {
                      history.push(BUYER_ROUTES.SELLER_DETAILS(s.id));
                    }}
                    leftComponent={
                      <>
                        {s.companyImage ? (
                          <Image src={s.companyImage} />
                        ) : (
                          <PlaceholderImage>
                            <PlaceholderProfile />
                          </PlaceholderImage>
                        )}
                        <Typography variant="label" color="shade9">
                          {s.companyName}
                        </Typography>
                      </>
                    }
                  />
                );
              })}
            </>
          ) : (
            <Row>
              {results.map((s) => {
                return (
                  <Col xxl={2} xl={3} md={4} sm={6} key={s.id}>
                    <Link to={`/buyer/seller-details/${s.id}`}>
                      <SellerCard {...s} />
                    </Link>
                  </Col>
                );
              })}
            </Row>
          )}
        </SellerContainer>
      ) : null}
    </PreviewContainer>
  );
};

export default SellerLanding;
