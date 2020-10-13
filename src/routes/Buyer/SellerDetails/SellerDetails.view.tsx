import React, { useEffect } from 'react';

import Interactions from 'components/base/Interactions';
import PaginateList from 'components/base/PaginateList';
import Spinner from 'components/base/Spinner';
import { ChevronRight, Octopus, InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import PreviewCard from 'components/module/CategoryCards/Preview';
import CategoryImage from 'components/module/CategoryImage';
import EmptyState from 'components/module/EmptyState';
import Search from 'components/module/Search';
import SellerRating from 'components/module/SellerRating';
import { BUYER_ROUTES } from 'consts/routes';
import { isEmpty } from 'ramda';
import reverse from 'ramda/es/reverse';
import { Row, Col } from 'react-grid-system';
import { Link, useHistory } from 'react-router-dom';
// import { useTheme } from 'utils/Theme';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import {
  Container,
  SellerRatingContainer,
  CategoryContainer,
  SpinnerContainer,
  ListingContainer,
  ListingCounter,
  SearchContainer,
  ListContainer,
  ListItemInteraction,
  ListingImageContainer,
  RightComponent,
  ListingHeader,
} from './SellerDetails.style';

const SellerDetailsView = (props: SellerDetailsGeneratedProps) => {
  const history = useHistory();
  const {
    sellerRatingProps,
    searching,
    searchWord,
    setSearchWord,
    recent,
    onReset,
    saveSearchHistory,
    loadingProductSearch,
    productSearchResultsHeader,
    addresses,
    onChangeSearchValue,
    onLoad,
    resetSearchValue,
    results,
    searchValue,
    selectAddress,
    selectedAddress,
    sellerId,
    loading,
  } = props;

  useEffect(() => {
    selectAddress(sellerId);
    onLoad(sellerId);
  }, []);
  const showRecentSearch = searchWord.length === 0;
  const data = showRecentSearch ? reverse(recent) : productSearchResultsHeader;

  return (
    <Container>
      {loadingProductSearch ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <div>
            <Col xs={12} style={{ marginBottom: '24px' }}>
              <Search
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                resetValue={onReset}
                placeholder="Search.."
              />
            </Col>
            {!isEmpty(data) && (
              <Typography variant="overline" color="shade6">
                {showRecentSearch ? 'Recent Searches' : 'Results'}
              </Typography>
            )}
            {isEmpty(data) && searchWord.length > 0 && !loadingProductSearch ? (
              <EmptyState
                onButtonClicked={onReset}
                Svg={Octopus}
                title="No search result"
                buttonText="Reset Search"
              />
            ) : (
              <>
                <PaginateList
                  list={data || []}
                  labelPath={['label']}
                  maxItemPerPage={6}
                  onClickItem={(item) => {
                    history.push(BUYER_ROUTES.SEARCH_PREVIEW(item.value));
                    saveSearchHistory(item.value, item.label, item.count);
                  }}
                />
                <div style={{ marginBottom: '24px' }}></div>
              </>
            )}
          </div>
        </>
      )}
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
            <div>
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
            <>
              <div
                className="row cards"
                style={{ marginTop: 20, marginLeft: 10 }}
              >
                {results.map((r, idx) => {
                  return (
                    <div
                      style={{ marginRight: 32 }}
                      className="column"
                      key={r.id}
                    >
                      <Link
                        to={`/buyer/product/${r.id}`}
                        className="market-item"
                      >
                        <PreviewCard
                          key={r.id}
                          cardContainerStyle={{
                            maxWidth: '100%',
                            minWidth: '60%',
                          }}
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
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SellerDetailsView;
