import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { SellerLandingGeneratedProps } from './SellerLanding.props';
import {
  PreviewContainer,
  CardContainer,
  SellerCardTypography,
  SellerContainer,
} from './SellerLanding.style';

const SellerLanding = (props: SellerLandingGeneratedProps) => {
  // const theme = useTheme();
  const { results, onChangeSearchValue, search, resetSearchValue } = props;

  return (
    <PreviewContainer>
      <Row nogutter>
        <Col xs={12}>
          <SearchAddressView
            value={search}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search.."
          />
        </Col>
      </Row>
      {results.length > 0 ? (
        <>
          <Row className="cards" style={{ marginTop: 20 }}>
            <SellerContainer>
              {results.map((s) => {
                return (
                  <Col xxl={2} xl={3} md={4} sm={6} key={s.id}>
                    <Link to={`/buyer/seller-details/${s.id}`}>
                      <CardContainer className="centered">
                        <div className="card">
                          <img src={s.companyImage} alt={s.companyImage} />
                          <div className="card-content">
                            <SellerCardTypography>
                              {s.companyName}
                            </SellerCardTypography>
                          </div>
                        </div>
                      </CardContainer>
                    </Link>
                  </Col>
                );
              })}
            </SellerContainer>
          </Row>
        </>
      ) : null}
    </PreviewContainer>
  );
};

export default SellerLanding;
