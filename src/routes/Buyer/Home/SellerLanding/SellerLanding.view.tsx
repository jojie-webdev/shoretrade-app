import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Search from 'components/module/Search';
import SellerCard from 'components/module/SellerCard';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { SellerLandingGeneratedProps } from './SellerLanding.props';
import { PreviewContainer, SellerContainer } from './SellerLanding.style';

const SellerLanding = (props: SellerLandingGeneratedProps) => {
  // const theme = useTheme();
  const { results, onChangeSearchValue, search, resetSearchValue } = props;

  return (
    <PreviewContainer>
      <Row nogutter>
        <Col xs={12}>
          <Search
            value={search}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search.."
          />
        </Col>
      </Row>
      {results.length > 0 ? (
        <>
          <SellerContainer>
            <Row style={{ marginTop: 20 }}>
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
          </SellerContainer>
        </>
      ) : null}
    </PreviewContainer>
  );
};

export default SellerLanding;
