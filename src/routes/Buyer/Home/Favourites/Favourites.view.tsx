import React from 'react';

import { Octopus } from 'components/base/SVG';
import Toggle from 'components/base/Toggle';
import PreviewCard from 'components/module/CategoryCards/Preview';
import { PreviewDetailAlt } from 'components/module/CategoryCards/Preview/Preview.view';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { FavouritesGeneratedProps } from './Favourites.props';
import {
  PreviewContainer,
  StyledInteraction,
  FilterAndSearchContainer,
  FilterContainer,
  NegotiableTextWrapper,
} from './Favourites.style';

const FavouritesView = (props: FavouritesGeneratedProps) => {
  const {
    results,
    isPendingAccount,
    onChangeSearchValue,
    onResetSearchValue,
    searchValue,
    isLoadingResults,
    handleShowNegoCreditsModal,
    negotiationCredit,
    handleShowNegoModal,
    handleNegotiableToggle,
    canNegotiate,
    showNegotiable,
  } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <PreviewContainer>
      <div className="header">
        {isSmallScreen && <MobileHeader>Favourites</MobileHeader>}

        <FilterAndSearchContainer>
          <FilterContainer>
            <NegotiableTextWrapper>Only Negotiable</NegotiableTextWrapper>
            <Toggle
              onClick={() =>
                handleNegotiableToggle(!showNegotiable.showNegotiable)
              }
              checked={showNegotiable.showNegotiable}
            />
          </FilterContainer>

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
        </FilterAndSearchContainer>
      </div>

      {isLoadingResults && <Loading />}

      {results.length > 0 ? (
        <>
          <Row nogutter>
            {results.map((fav) => {
              return (
                <Col key={fav.id} xxl={3} xl={4} lg={6} md={12} sm={6} xs={12}>
                  <Link to={BUYER_ROUTES.PRODUCT_DETAIL(fav.id)}>
                    {isSmallScreen ? (
                      <StyledInteraction>
                        <PreviewDetailAlt
                          alternate
                          id={fav.id}
                          images={fav.images}
                          type={fav.type}
                          price={toPrice(fav.price)}
                          remaining={fav.remaining.toFixed(2)}
                          coop={fav.coop}
                          minimumOrder={fav.minimumOrder}
                          origin={fav.origin}
                          shippingFrom={fav.shippingFrom}
                          weight={sizeToString(
                            fav.size.unit,
                            fav.size.from,
                            fav.size.to
                          )}
                          isAquafuture={fav.isAquafuture}
                          catchRecurrence={fav.catchRecurrence}
                          unit={fav.measurementUnit}
                          state={fav.state}
                          hiddenPrice={isPendingAccount}
                          hiddenVendor={isPendingAccount}
                          isIkeJime={fav.isIkeJime}
                          isIceSlurry={fav.isIceSlurry}
                          quality={fav.quality}
                          templateDeliveryDate={fav.templateDeliveryDate}
                          isForSaleRepPhoto={fav.isForSaleRepPhoto}
                          isSFMCrate={fav.packaging?.type === 'SFM'}
                          allowNegotiations={fav.allowNegotiations}
                          auctionDate={fav.auctionDate}
                          handleShowNegoCreditsModal={
                            handleShowNegoCreditsModal
                          }
                          negotiationCredit={negotiationCredit}
                          handleShowNegoModal={handleShowNegoModal}
                          canNegotiate={canNegotiate}
                          negotiationId={fav.negotiation_id}
                        />
                      </StyledInteraction>
                    ) : (
                      <PreviewCard
                        id={fav.id}
                        images={fav.images}
                        type={fav.type}
                        price={toPrice(fav.price)}
                        remaining={fav.remaining.toFixed(2)}
                        coop={fav.coop}
                        minimumOrder={fav.minimumOrder}
                        origin={fav.origin}
                        weight={sizeToString(
                          fav.size.unit,
                          fav.size.from,
                          fav.size.to
                        )}
                        isAquafuture={fav.isAquafuture}
                        catchRecurrence={fav.catchRecurrence}
                        unit={fav.measurementUnit}
                        state={fav.state}
                        hiddenPrice={isPendingAccount}
                        hiddenVendor={isPendingAccount}
                        isIkeJime={fav.isIkeJime}
                        isIceSlurry={fav.isIceSlurry}
                        quality={fav.quality}
                        templateDeliveryDate={fav.templateDeliveryDate}
                        isForSaleRepPhoto={fav.isForSaleRepPhoto}
                        isSFMCrate={fav.packaging?.type === 'SFM'}
                        allowNegotiations={fav.allowNegotiations}
                        auctionDate={fav.auctionDate}
                        handleShowNegoCreditsModal={handleShowNegoCreditsModal}
                        negotiationCredit={negotiationCredit}
                        handleShowNegoModal={handleShowNegoModal}
                        canNegotiate={canNegotiate}
                        negotiationId={fav.negotiation_id}
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

export default FavouritesView;
