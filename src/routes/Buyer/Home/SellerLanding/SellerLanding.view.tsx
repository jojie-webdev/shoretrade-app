import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import PreviewCard from 'components/module/CategoryCards/Preview';
import EmptyState from 'components/module/EmptyState';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { SellerLandingGeneratedProps } from './SellerLanding.props';
import {
  PreviewContainer,
  LoadingContainer,
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
          <Row nogutter className="cards" style={{ marginTop: 20 }}>
            <SellerContainer>
              {results.map((s) => {
                return (
                  <Link to={`/buyer/seller-details/${s.id}`} key={s.id}>
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
