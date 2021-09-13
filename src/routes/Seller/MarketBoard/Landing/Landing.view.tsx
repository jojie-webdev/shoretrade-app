import React from 'react';

import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import { Sync, ChevronRight } from 'components/base/SVG';
import Tabs from 'components/base/Tabs';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { isNil, prop, sortBy, isEmpty } from 'ramda';
import { Hidden, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import {
  getExpiry,
  getShippingAddress,
  getStatus,
  getStatusBadgeColor,
  isOfferMade,
  isRedLabel,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import {
  Container,
  FilterButton,
  BadgeText,
  ItemInteraction,
  StyledBadge,
} from './Landing.style';
import MobileMarketRequests from './MobileMarketRequest/MobileMarketRequest.view';
import MobileOffers from './MobileOffers/MobileOffers.view';

const BuyerRequestsInteractions = (props: {
  onClick: () => void;
  data: GetAllMarketRequestResponseItem;
  activeOffers?: GetActiveOffersRequestResponseItem[];
}) => {
  const { onClick, data, activeOffers } = props;
  const unit = formatMeasurementUnit(data.measurementUnit);

  const buildSizeValue = () => {
    const sizeValue =
      data.sizeOptions && Object.keys(data.sizeOptions).length != 0
        ? data.sizeOptions.join(', ')
        : sizeToString(
            data.metric,
            (data.sizeFrom || '').toString(),
            (data.sizeTo || '').toString()
          );

    return sizeValue;
  };

  const getOfferByMarketRequest = () => {
    const _offer = activeOffers?.find(
      (offer) => offer.marketRequest.id === data.id
    );

    return _offer;
  };

  const isPaymentRequired = () => {
    const { status, negotiations } = getOfferByMarketRequest() || {};

    if (!negotiations) {
      return false;
    }

    if (negotiations?.length === 0) {
      return false;
    }

    const offerSorter = sortBy(prop('created_at'));
    const sortedNegos = offerSorter(negotiations).reverse();

    const isPaymentRequired =
      status === 'OPEN' && sortedNegos[0]?.price === sortedNegos[1]?.price;

    return isPaymentRequired;
  };

  const isPaymentPending = () => {
    const { negotiations } = getOfferByMarketRequest() || {};

    if (!negotiations) {
      return false;
    }

    if (negotiations?.length === 0) {
      return false;
    }

    const offerSorter = sortBy(prop('created_at'));
    const sortedNegos = offerSorter(negotiations).reverse();

    const hours = moment().diff(moment(sortedNegos[0]?.created_at), 'hours');
    const isPending = hours <= 24;

    return isPending;
  };

  return (
    <Interactions
      onClick={() => onClick()}
      leftComponent={
        <>
          <img src={parseImageUrl(data.image)} />
          <div className="section">
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
          </div>
          <div className="section">
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
          </div>
          <div className="section">
            <Typography
              variant="caption"
              color={isRedLabel(data.createdAt) ? 'error' : 'shade6'}
            >
              {getExpiry(data.createdAt)}
            </Typography>
          </div>
          <div className="section">
            {isPaymentRequired() ? (
              isPaymentPending() ? (
                <StyledBadge
                  className="badge"
                  badgeColor={theme.brand.error}
                  style={{ lineHeight: '15px' }}
                >
                  <BadgeText
                    variant="overlineSmall"
                    color="noshade"
                    style={{ lineHeight: '15px' }}
                  >
                    PENDING PAYMENT
                  </BadgeText>
                </StyledBadge>
              ) : (
                getExpiry(data.createdAt) === 'Expired' && (
                  <StyledBadge
                    className="badge"
                    badgeColor={getStatusBadgeColor('DECLINED')}
                  >
                    <BadgeText
                      variant="overlineSmall"
                      color="noshade"
                      style={{ lineHeight: '15px' }}
                    >
                      LOST
                    </BadgeText>
                  </StyledBadge>
                )
              )
            ) : (
              isOfferMade(data, activeOffers) && (
                <StyledBadge className="badge" badgeColor={theme.brand.success}>
                  <BadgeText
                    variant="overlineSmall"
                    color="noshade"
                    style={{ lineHeight: '15px' }}
                  >
                    ACTIVE OFFER
                  </BadgeText>
                </StyledBadge>
              )
            )}
          </div>
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
  const { onClick, data, buyerRequests } = props;

  const status = getStatus(data.status);
  const sizeUnit =
    formatMeasurementUnit(data.measurementUnit) === 'kg' ? 'kg' : '';

  const isPaymentPending = () => {
    const { negotiations } = data || {};

    if (!negotiations) {
      return false;
    }

    if (negotiations?.length === 0) {
      return false;
    }

    const offerSorter = sortBy(prop('created_at'));
    const sortedNegos = offerSorter(negotiations).reverse();
    const hours = moment().diff(moment(sortedNegos[0]?.created_at), 'hours');
    const isPending = hours <= 24;

    return isPending;
  };

  const isPaymentRequired = () => {
    const { status, negotiations } = data || {};

    if (!negotiations) {
      return false;
    }

    if (negotiations?.length === 0) {
      return false;
    }

    const offerSorter = sortBy(prop('created_at'));
    const sortedNegos = offerSorter(negotiations).reverse();

    const isPaymentRequired =
      status === 'OPEN' && sortedNegos[0]?.price === sortedNegos[1]?.price;

    return isPaymentRequired;
  };

  const buildSizeData = () => {
    const getFromOnlySize = () => {
      if (!data.size.to) {
        return data.size.from + ' ' + sizeUnit;
      } else return '';
    };

    const getFromAndToSize = () => {
      const toSize = data.size.to && ` - ${data.size.to} ${sizeUnit}`;

      if (!toSize) {
        return '';
      }

      return toSize;
    };

    const sizeData = !data.size.from
      ? 'Ungraded'
      : getFromOnlySize() + ' ' + getFromAndToSize();

    return sizeData;
  };

  return (
    <Interactions
      onClick={() => onClick()}
      leftComponent={
        <>
          <img src={parseImageUrl(data.image)} />
          <div className="section">
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
          </div>
          <div className="section">
            <Typography variant="caption" color="shade6">
              Size: {buildSizeData()}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              Price: ${data.price}/{formatMeasurementUnit(data.measurementUnit)}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              Shipping to: {getShippingAddress(data.shippingTo)}
            </Typography>
          </div>
          <div className="section">
            <Typography
              variant="caption"
              color={
                isRedLabel(data.marketRequest.createdAt) ? 'error' : 'shade6'
              }
            >
              {getExpiry(data.marketRequest.createdAt)}
            </Typography>
          </div>
          <div className="section">
            {isPaymentRequired() ? (
              isPaymentPending() ? (
                <StyledBadge className="badge" badgeColor={theme.brand.error}>
                  <BadgeText
                    variant="overlineSmall"
                    color="noshade"
                    style={{ lineHeight: '15px' }}
                  >
                    PENDING PAYMENT
                  </BadgeText>
                </StyledBadge>
              ) : (
                getExpiry(data.createdAt) === 'Expired' && (
                  <StyledBadge
                    className="badge"
                    badgeColor={getStatusBadgeColor('DECLINED')}
                  >
                    <BadgeText
                      variant="overlineSmall"
                      color="noshade"
                      style={{ lineHeight: '15px' }}
                    >
                      LOST
                    </BadgeText>
                  </StyledBadge>
                )
              )
            ) : (
              <StyledBadge
                className="badge"
                badgeColor={getStatusBadgeColor(data.status)}
              >
                <BadgeText
                  variant="overlineSmall"
                  color={status === 'NEGOTIATION' ? 'shade10' : 'noshade'}
                  style={{ lineHeight: '15px' }}
                >
                  {status}
                </BadgeText>
              </StyledBadge>
            )}
          </div>
        </>
      }
      padding="8px 20px 8px 8px"
    />
  );
};

const MarketBoardLandingView = (props: MarketBoardLandingGeneratedProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

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

      {isMobile && <MobileHeader>Market Board</MobileHeader>}

      <div className="tabs-row">
        <div className="tabs">
          <Tabs
            tabs={['Buyer Requests', 'My Active Offers']}
            selectedTab={props.currentTab}
            onClickTab={(tab) => props.onChangeCurrentTab(tab as TabOptions)}
          />
        </div>

        <Search
          className="search"
          value={props.searchTerm}
          onChange={(event: any) =>
            props.setSearchTerm(event.currentTarget.value)
          }
          resetValue={() => props.setSearchTerm('')}
          placeholder="Product Name"
          rounded
        />
      </div>

      {props.isLoading ? (
        <Loading />
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
                      type={data.offers.length > 0 ? 'next' : 'none'}
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
                      type={data.offers.length > 0 ? 'next' : 'none'}
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
        </>
      )}

      {/*<FilterModal {...props.filterModalProps} isBuyerRequestFilters />*/}
    </Container>
  );
};

export default MarketBoardLandingView;
