import React from 'react';

import { Octopus } from 'components/base/SVG';
import PreviewCard from 'components/module/CategoryCards/Preview';
import { PreviewDetailAlt } from 'components/module/CategoryCards/Preview/Preview.view';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search/Search.view';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { RecentlyAddedGeneratedProps } from './RecentlyAdded.props';
import { PreviewContainer, StyledInteraction } from './RecentlyAdded.style';

const RecentlyAddedView = (props: RecentlyAddedGeneratedProps) => {
  const {
    results,
    isPendingAccount,
    onChangeSearchValue,
    onResetSearchValue,
    searchValue,
    isLoadingResults,
    canNegotiate,
  } = props;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <PreviewContainer>
      <div className="header">
        {isSmallScreen && <MobileHeader>Recently Added</MobileHeader>}

        <div className="right-header">
          <Search
            className="search"
            placeholder={`Search for a product or seller`}
            value={searchValue}
            onChange={onChangeSearchValue}
            resetValue={onResetSearchValue}
            rounded
          />
        </div>
      </div>

      {isLoadingResults && <Loading />}

      {results.length > 0 ? (
        <>
          <Row nogutter>
            {results.map((rec) => {
              return (
                <Col key={rec.id} xxl={3} xl={4} lg={6} md={12} sm={6} xs={12}>
                  <Link to={BUYER_ROUTES.PRODUCT_DETAIL(rec.id)}>
                    {isSmallScreen ? (
                      <StyledInteraction>
                        <PreviewDetailAlt
                          alternate
                          id={rec.id}
                          images={rec.images}
                          type={rec.type}
                          price={toPrice(rec.price)}
                          remaining={rec.remaining.toFixed(2)}
                          coop={rec.coop}
                          minimumOrder={rec.minimumOrder}
                          origin={rec.origin}
                          weight={sizeToString(
                            rec.size.unit,
                            rec.size.from,
                            rec.size.to
                          )}
                          isAquafuture={rec.isAquafuture}
                          catchRecurrence={rec.catchRecurrence}
                          unit={rec.measurementUnit}
                          state={rec.state}
                          hiddenPrice={isPendingAccount}
                          hiddenVendor={isPendingAccount}
                          isIkeJime={rec.isIkeJime}
                          isIceSlurry={rec.isIceSlurry}
                          quality={rec.quality}
                          templateDeliveryDate={rec.templateDeliveryDate}
                          isForSaleRepPhoto={rec.isForSaleRepPhoto}
                          isSFMCrate={rec.packaging?.type === 'SFM'}
                          allowNegotiations={rec.allowNegotiations}
                          canNegotiate={canNegotiate}
                        />
                      </StyledInteraction>
                    ) : (
                      <PreviewCard
                        id={rec.id}
                        images={rec.images}
                        type={rec.type}
                        price={toPrice(rec.price)}
                        remaining={rec.remaining.toFixed(2)}
                        coop={rec.coop}
                        minimumOrder={rec.minimumOrder}
                        origin={rec.origin}
                        shippingFrom={rec.shippingFrom}
                        weight={sizeToString(
                          rec.size.unit,
                          rec.size.from,
                          rec.size.to
                        )}
                        isAquafuture={rec.isAquafuture}
                        catchRecurrence={rec.catchRecurrence}
                        unit={rec.measurementUnit}
                        state={rec.state}
                        hiddenPrice={isPendingAccount}
                        hiddenVendor={isPendingAccount}
                        isIkeJime={rec.isIkeJime}
                        isIceSlurry={rec.isIceSlurry}
                        quality={rec.quality}
                        templateDeliveryDate={rec.templateDeliveryDate}
                        isForSaleRepPhoto={rec.isForSaleRepPhoto}
                        isSFMCrate={rec.packaging?.type === 'SFM'}
                        allowNegotiations={rec.allowNegotiations}
                        canNegotiate={canNegotiate}
                      />
                    )}
                  </Link>
                </Col>
              );
            })}
          </Row>
        </>
      ) : null}

      {!isLoadingResults && !!searchValue.length && !results.length && (
        <EmptyState
          Svg={Octopus}
          buttonText="Reset Search"
          onButtonClicked={onResetSearchValue}
          title="No search result"
        />
      )}
    </PreviewContainer>
  );
};

export default RecentlyAddedView;
