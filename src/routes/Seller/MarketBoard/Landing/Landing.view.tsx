import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import SegmentedControls from 'components/base/SegmentedControls';
import { ChevronRight, Filter } from 'components/base/SVG';
import Tabs from 'components/base/Tabs';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import FilterModal from 'components/module/FilterModal';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import NegotiationInteractions from 'components/module/NegotiationInteractions';
import OfferTag from 'components/module/OfferTag';
import Search from 'components/module/Search';
import TermsAndCondition from 'components/module/TermsAndCondition';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isNil, isEmpty } from 'ramda';
import { Col, Hidden, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { AnimatedOctopus } from 'res/images/animated/octopus';
import {
  getExpiry,
  getShippingAddress,
  isRedLabel,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import useLocalStorage from 'utils/Hooks/useLocalStorage';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { transformMarketRequestStatusText } from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';
import theme, { useTheme } from 'utils/Theme';

import { TABS } from './Landing.constants';
import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import {
  Container,
  ItemInteraction,
  FilterSearchContainer,
  FilterButton,
} from './Landing.style';
import MobileMarketRequests from './MobileMarketRequest/MobileMarketRequest.view';
import MobileOffers from './MobileOffers/MobileOffers.view';

const BuyerRequestsInteractions = (props: {
  onClick: () => void;
  data: GetAllMarketRequestResponseItem;
  activeOffers?: GetActiveOffersRequestResponseItem[];
}) => {
  const { onClick, data } = props;
  const unit = formatMeasurementUnit(data.measurementUnit);

  const buildSizeValue = () => {
    const sizeValue =
      data.sizeOptions && Object.keys(data.sizeOptions).length !== 0
        ? data.sizeOptions.join(', ')
        : sizeToString(
            data.metric,
            (data.sizeFrom || '').toString(),
            (data.sizeTo || '').toString()
          );

    return sizeValue;
  };

  const renderTagByStatus = () => {
    if (data.offers > 0) {
      return (
        <OfferTag
          text="Active Offers"
          badgeColor={theme.brand.success}
          variantColor="success"
          color="noshade"
        />
      );
    }
  };

  return (
    <Interactions
      onClick={() => onClick()}
      leftComponent={
        <>
          <img src={parseImageUrl(data.image)} alt="" />
          <Col style={{ padding: '0 5px' }}>
            <Typography
              variant="caption"
              color="noshade"
              style={{ fontSize: 15 }}
            >
              {data.type}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              {!isNil(data.specifications) &&
                Array.isArray(data.specifications) &&
                data.specifications.map((s) => s.stateName).join(', ')}
            </Typography>
          </Col>
          <Col style={{ padding: '0 5px' }}>
            <Typography variant="caption" color="shade6">
              Size: {buildSizeValue()}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              Qty:{' '}
              {`${data.weight?.from || ''} - ${data.weight?.to || ''}${unit}`}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              Shipping to: {data.shippingTo.suburb}, {data.shippingTo.state}{' '}
              {data.shippingTo.postcode}
            </Typography>
          </Col>
          <Col style={{ padding: '0 5px' }}>
            <Typography
              variant="caption"
              color={isRedLabel(data.createdAt) ? 'error' : 'shade6'}
            >
              {getExpiry(data.createdAt)}
            </Typography>
          </Col>
          <Col style={{ padding: '0 5px' }}>
            <div style={{ display: 'flex' }}>{renderTagByStatus()}</div>
          </Col>
        </>
      }
      padding="8px 20px 8px 8px"
    />
  );
};

const MyActiveOffersInteractions = (props: {
  onClick: () => void;
  data: GetActiveOffersRequestResponseItem;
  buyerRequests?: GetAllMarketRequestResponseItem[];
}) => {
  const { onClick, data } = props;
  const theme = useTheme();

  const sizeUnit =
    formatMeasurementUnit(data.measurementUnit) === 'kg' ? 'kg' : '';

  const statusTextProps = transformMarketRequestStatusText(
    theme,
    data.statusText,
    true
  );

  let latestOfferPrice = data.price;

  if (data.negotiations.length > 0) {
    const latestSellerOffer = data.negotiations.filter(
      (n) => n.type === 'NEW_OFFER'
    )[0];
    if (latestSellerOffer) {
      latestOfferPrice = latestSellerOffer.price;
    }
  }

  return (
    <Interactions
      onClick={() => onClick()}
      leftComponent={
        <>
          <img src={parseImageUrl(data.image)} alt="" />
          <Col style={{ padding: '0 5px' }}>
            <Typography
              variant="caption"
              color="noshade"
              style={{ fontSize: 14 }}
            >
              {data.name}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              {!isNil(data.specifications) &&
                Array.isArray(data.specifications) &&
                data.specifications.join(', ')}
            </Typography>
          </Col>
          <Col style={{ padding: '0 5px' }}>
            <Typography variant="caption" color="shade6">
              Size: {sizeToString(data.metric, data.size.from, data.size.to)}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              Price: ${latestOfferPrice}/
              {formatMeasurementUnit(data.measurementUnit)}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              Qty: {`${data.weight} ${sizeUnit}`}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              Shipping to: {getShippingAddress(data.shippingTo)}
            </Typography>
          </Col>
          <Col style={{ padding: '0 5px' }}>
            <Typography
              variant="caption"
              color={
                isRedLabel(data.marketRequest.createdAt) ? 'error' : 'shade6'
              }
            >
              {getExpiry(data.marketRequest.createdAt)}
            </Typography>
          </Col>
          <Col style={{ padding: '0 5px' }}>
            {statusTextProps.text !== '' && (
              <OfferTag
                text={statusTextProps.text}
                badgeColor={statusTextProps.badgeColor || ''}
                variantColor={statusTextProps.variantColor}
                color={statusTextProps.tagColor}
              />
            )}
          </Col>
        </>
      }
      padding="8px 20px 8px 8px"
    />
  );
};

const MarketBoardLandingView = (props: MarketBoardLandingGeneratedProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const [isAcceptClicked, setIsAcceptClicked] = useLocalStorage(
    'isTermsAndConAccepted',
    false
  );
  const [isNegoAcceptClicked, setIsNegoAcceptClicked] = useLocalStorage(
    'isNegoTermsAndConAccepted',
    false
  );

  return (
    <Container>
      {props.userPending && (
        <Alert
          variant="alert"
          content={`Your account needs approval.`}
          fullWidth
          alignText="center"
          style={{ marginBottom: 16 }}
        />
      )}

      {isMobile && <MobileHeader>Negotiations & Request</MobileHeader>}

      <div className="tabs-row">
        <SegmentedControls
          options={[TABS.NEGO, TABS.REVERSE_MARKETPLACE]}
          controlButtonColor={theme.brand.primary}
          controlButtonTextColor={theme.grey.noshade}
          inactiveBackgroundColor={theme.grey.shade9}
          selectedOption={props.activeTab}
          onClickControl={(value) => {
            props.handleTabSelect(
              value === TABS.NEGO ? TABS.NEGO : TABS.REVERSE_MARKETPLACE
            );
          }}
        />

        <div className="tabs">
          {props.activeTab === TABS.REVERSE_MARKETPLACE && isAcceptClicked && (
            <Tabs
              tabs={['My Active Offers', 'Buyer Requests']}
              selectedTab={props.currentTab}
              onClickTab={(tab) => props.onChangeCurrentTab(tab as TabOptions)}
            />
          )}
        </div>

        <FilterSearchContainer>
          {isNegoAcceptClicked && (
            <Search
              className="search"
              value={props.searchNegoTerm}
              onChange={(event: any) =>
                props.handleSearchNegotiations(event.currentTarget.value)
              }
              resetValue={() => props.handleSearchNegotiations('')}
              placeholder="Product Name"
              rounded
            />
          )}
          {props.currentTab === 'Buyer Requests' && (
            <FilterButton
              className="filter-button"
              onClick={props.onClickFilterButton}
            >
              <Typography
                variant="label"
                color="noshade"
                weight="500"
                className="btn-text"
              >
                Filters
              </Typography>

              <Filter />
            </FilterButton>
          )}
        </FilterSearchContainer>
      </div>

      {props.isLoading ? (
        <Loading />
      ) : props.activeTab === TABS.REVERSE_MARKETPLACE ? (
        !isAcceptClicked ? (
          <TermsAndCondition
            appType="seller"
            textWeb1=""
            textWeb2="Browse Buyer Requests"
            textMobile1="Browse Buyer Requests"
            textMobile2=""
            textMobile3=""
            cardText1={
              'View the products Buyers have requested and make offers directly to them.'
            }
            cardText2={
              'Negotiate and accept offers before the Buyer Request closes 7 days after creation or once the quantity requested has been filled.'
            }
            cardText3={
              'Organise shipping for all finalised Buyer Requests. Keep in mind that a Buyer Request is not finalised until the Buyer has processed the payment. Turn on your notifications to ensure you stay up to date.'
            }
            isAcceptClicked={isAcceptClicked}
            setIsAcceptClicked={setIsAcceptClicked}
          />
        ) : (
          <>
            {props.currentTab === 'Buyer Requests' &&
              !isEmpty(props.sellingRequests) && (
                <>
                  <Typography
                    variant="overlineSmall"
                    color="shade7"
                    style={{ marginBottom: 12 }}
                  >
                    Products I Sell
                  </Typography>

                  <Hidden xs sm>
                    {props.sellingRequests.map((data) => (
                      <BuyerRequestsInteractions
                        key={data.id}
                        onClick={() => props.onClickOffer(data)}
                        data={data}
                        activeOffers={props.activeOffers}
                      />
                    ))}
                  </Hidden>

                  <Visible xs sm>
                    {props.sellingRequests.map((data) => (
                      <ItemInteraction
                        key={data.id}
                        type={data.offers > 0 ? 'next' : 'none'}
                        onClick={() => props.onClickOffer(data)}
                        leftComponent={
                          <MobileMarketRequests
                            data={data}
                            activeOffers={props.activeOffers}
                          />
                        }
                        rightComponent={
                          <div className="cta">
                            <div>
                              <ChevronRight width={8} height={12} />
                            </div>
                          </div>
                        }
                      />
                    ))}
                  </Visible>

                  <div style={{ marginBottom: 32 }} />
                </>
              )}

            {props.currentTab === 'Buyer Requests' &&
              !isEmpty(props.buyerRequests) && (
                <>
                  <Typography
                    variant="overlineSmall"
                    color="shade7"
                    style={{ marginBottom: 12 }}
                  >
                    All Products
                  </Typography>

                  <Hidden xs sm>
                    {props.buyerRequests.map((data) => (
                      <BuyerRequestsInteractions
                        key={data.id}
                        onClick={() => props.onClickOffer(data)}
                        data={data}
                        activeOffers={props.activeOffers}
                      />
                    ))}
                  </Hidden>

                  <Visible xs sm>
                    {props.buyerRequests.map((data) => (
                      <ItemInteraction
                        key={data.id}
                        type={data.offers > 0 ? 'next' : 'none'}
                        onClick={() => props.onClickOffer(data)}
                        leftComponent={
                          <MobileMarketRequests
                            data={data}
                            activeOffers={props.activeOffers}
                          />
                        }
                        rightComponent={
                          <div className="cta">
                            <div>
                              <ChevronRight width={8} height={12} />
                            </div>
                          </div>
                        }
                      />
                    ))}
                  </Visible>
                </>
              )}

            <Hidden xs sm>
              {props.currentTab === 'My Active Offers' &&
                !isNil(props.activeOffers) &&
                props.activeOffers.map((data) => (
                  <MyActiveOffersInteractions
                    key={data.id}
                    onClick={() => props.onClickActiveOffer(data)}
                    data={data}
                    buyerRequests={props.buyerRequests}
                  />
                ))}
            </Hidden>

            <Visible xs sm>
              {props.currentTab === 'My Active Offers' &&
                !isNil(props.activeOffers) &&
                props.activeOffers.map((data) => (
                  <ItemInteraction
                    key={data.id}
                    type={data.offers?.length > 0 ? 'next' : 'none'}
                    onClick={() => props.onClickActiveOffer(data)}
                    leftComponent={
                      <MobileOffers
                        data={data}
                        buyerRequests={props.buyerRequests}
                      />
                    }
                    rightComponent={
                      <div className="cta">
                        <div>
                          <ChevronRight width={8} height={12} />
                        </div>
                      </div>
                    }
                  />
                ))}
            </Visible>
            {isEmpty(props.activeOffers) &&
              props.currentTab === 'My Active Offers' && (
                <EmptyState
                  AnimatedSvg={AnimatedOctopus}
                  title="No active offers"
                />
              )}
            {isEmpty(props.buyerRequests) &&
              props.currentTab === 'Buyer Requests' && (
                <EmptyState
                  AnimatedSvg={AnimatedOctopus}
                  title="No buyer requests"
                />
              )}
          </>
        )
      ) : !isNegoAcceptClicked ? (
        <TermsAndCondition
          appType="seller"
          textWeb1=""
          textWeb2="Manage your Negotiations"
          textMobile1=""
          textMobile2=""
          textMobile3="Manage your Negotiations"
          cardText1={
            'Gain more sales by enabling negotiations on your listings.<br><br>Press Allow Negotiations on the final step of adding a listing, and wait for buyers to bite.'
          }
          cardText2={
            'Get notified and view any negotiations buyers have sent. You can Accept, Re-negotiate or Decline the offers.'
          }
          cardText3={
            'Once an offer is accepted, the buyer will process the payment and the negotiation will be finalised.<br><br>View the new order in the Sold tab.'
          }
          isAcceptClicked={isNegoAcceptClicked}
          setIsAcceptClicked={setIsNegoAcceptClicked}
          isNegotiations={true}
        />
      ) : (
        <>
          <Typography
            variant="overlineSmall"
            color="shade7"
            style={{ marginBottom: 10 }}
          >
            LISTINGS UNDER NEGOTIATIONS
          </Typography>
          {props?.negotiations ? (
            props.negotiations.map((data) => (
              <NegotiationInteractions
                key={data.listing_id}
                onClick={() => props.onNegotiationClick(data)}
                data={data}
                isMobile={isMobile}
              />
            ))
          ) : (
            <EmptyState AnimatedSvg={AnimatedOctopus} title="No negotiations" />
          )}
        </>
      )}

      <FilterModal {...props.filterModalProps} isBuyerRequestFilters />
    </Container>
  );
};

export default MarketBoardLandingView;
