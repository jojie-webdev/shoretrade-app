import React from 'react';

import Spinner from 'components/base/Spinner';
import Typography from 'components/base/Typography';
import PreviewCard from 'components/module/CategoryCards/Preview';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import SellerRating from 'components/module/SellerRating';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
// import { useTheme } from 'utils/Theme';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import {
  Container,
  SellerRatingContainer,
  SpinnerContainer,
  ListingCounter,
  ListingHeader,
} from './SellerDetails.style';

const SellerDetailsView = (props: SellerDetailsGeneratedProps) => {
  const {
    sellerRatingProps,
    onChangeSearchValue,
    resetSearchValue,
    results,
    searchValue,
    loading,
  } = props;

  return (
    <Container>
      <div>
        <Col xs={12} style={{ marginBottom: '24px' }}>
          <SearchAddressView />
        </Col>
      </div>

      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <SellerRatingContainer>
            <SellerRating {...sellerRatingProps} />
          </SellerRatingContainer>
          <ListingHeader>
            <Typography variant="title5" color="shade9">
              Active Listing
              <ListingCounter>{results.length}</ListingCounter>
            </Typography>
            <div className="search-container">
              <Search
                value={searchValue}
                resetValue={resetSearchValue}
                onChange={onChangeSearchValue}
                placeholder="Filter Products"
                isSellerProduct
              />
            </div>
          </ListingHeader>
          {results && (
            <Row>
              {results.map((r) => {
                return (
                  <Col key={r.id} xxl={3} xl={4} lg={6} md={6} sm={6} xs={10}>
                    <Link to={`/buyer/product/${r.id}`} className="market-item">
                      <PreviewCard
                        key={r.id}
                        id={r.id}
                        images={r.images}
                        type={r.type}
                        price={toPrice(r.pricePerKilo)}
                        remaining={r.remaining.toFixed(2)}
                        coop={{ name: r.coopName }}
                        minimumOrder={r.minimumOrder}
                        origin={r.origin}
                        weight={sizeToString(
                          r.typeMetric,
                          r.sizeFrom,
                          r.sizeTo
                        )}
                        isAquafuture={r.isAquafuture}
                        unit={r.measurementUnit}
                        state={r.specifications}
                      />
                    </Link>
                  </Col>
                );
              })}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default SellerDetailsView;
