import React from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge/Badge.view';
import Interactions from 'components/base/Interactions';
import { Sync, CheckFilled, CloseFilled } from 'components/base/SVG';
import Tabs from 'components/base/Tabs';
import Typography from 'components/base/Typography';
import FilterModal from 'components/module/FilterModal';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { isNil, prop, sortBy, isEmpty } from 'ramda';
import { useMediaQuery } from 'react-responsive';
import {
  getExpiry,
  getShippingAddress,
  hasShippingAddress,
  isRedLabel,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import theme, { useTheme } from 'utils/Theme';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import { Container, FilterButton, BadgeText } from './Landing.style';

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

  const isOfferMade = () => {
    const { status } = getOfferByMarketRequest() || {};
    const isOfferMade = status === 'OPEN';

    return isOfferMade;
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
              {`${data.weight?.from || ''}${unit} - ${
                data.weight?.to || ''
              }${unit}`}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              style={{ marginTop: 4 }}
            >
              Shipping to: {data?.shippingTo?.suburb}, {data?.shippingTo?.state}{' '}
              {data?.shippingTo?.postcode}
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
                <Badge className="badge" badgeColor={theme.brand.error}>
                  <BadgeText variant="overlineSmall" color="noshade">
                    PENDING PAYMENT
                  </BadgeText>
                  <div className="svg-container">{setIcon('OPEN')}</div>
                </Badge>
              ) : (
                getExpiry(data.createdAt) === 'Expired' && (
                  <Badge
                    className="badge"
                    badgeColor={getStatusBadgeColor('DECLINED')}
                  >
                    <BadgeText variant="overlineSmall" color="noshade">
                      LOST
                    </BadgeText>
                    <div className="svg-container">{setIcon('DECLINED')}</div>
                  </Badge>
                )
              )
            ) : (
              isOfferMade() && (
                <Badge className="badge" badgeColor={theme.brand.success}>
                  <BadgeText variant="overlineSmall" color="noshade">
                    ACTIVE OFFER
                  </BadgeText>
                  <div className="svg-container">{setIcon('ACCEPTED')}</div>
                </Badge>
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
              Size:{' '}
              {!data.size.from ? 'Ungraded' : `${data.size.from}${sizeUnit}`}
              {data.size.to && ` - ${data.size.to}${sizeUnit}`}
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
              Shipping to:{' '}
              {hasShippingAddress(data, buyerRequests)
                ? getShippingAddress(data, buyerRequests)
                : 'No address'}
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
                <Badge className="badge" badgeColor={theme.brand.error}>
                  <BadgeText variant="overlineSmall" color="noshade">
                    PENDING PAYMENT
                  </BadgeText>
                  <div className="svg-container">{setIcon('OPEN')}</div>
                </Badge>
              ) : (
                getExpiry(data.createdAt) === 'Expired' && (
                  <Badge
                    className="badge"
                    badgeColor={getStatusBadgeColor('DECLINED')}
                  >
                    <BadgeText variant="overlineSmall" color="noshade">
                      LOST
                    </BadgeText>
                    <div className="svg-container">{setIcon('DECLINED')}</div>
                  </Badge>
                )
              )
            ) : (
              <Badge
                className="badge"
                badgeColor={getStatusBadgeColor(data.status)}
              >
                <BadgeText variant="overlineSmall" color="noshade">
                  {status}
                </BadgeText>
                <div className="svg-container">{setIcon(data.status)}</div>
              </Badge>
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
          placeholder="Search for a product"
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

                {props.sellingRequests.map((data) => (
                  <BuyerRequestsInteractions
                    key={data.id}
                    onClick={() => props.onClickOffer(data)}
                    data={data}
                    activeOffers={props.activeOffers}
                  />
                ))}

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

                {props.buyerRequests.map((data) => (
                  <BuyerRequestsInteractions
                    key={data.id}
                    onClick={() => props.onClickOffer(data)}
                    data={data}
                    activeOffers={props.activeOffers}
                  />
                ))}
              </>
            )}

          {props.currentTab === 'My Active Offers' &&
            !isNil(props.activeOffers) &&
            props.activeOffers.map((data, i) => (
              <MyActiveOffersInteractions
                key={data.id}
                onClick={() => props.onClickActiveOffer(data)}
                data={data}
                buyerRequests={props.marketRequests}
              />
            ))}
        </>
      )}

      {/*<FilterModal {...props.filterModalProps} isBuyerRequestFilters />*/}
    </Container>
  );
};

function getStatus(status: GetActiveOffersRequestResponseItem['status']) {
  if (status === 'OPEN') return 'NEGOTIATION';
  if (status === 'ACCEPTED') return 'ACCEPTED';
  if (status === 'DECLINED') return 'LOST';
  if (status === 'CLOSED') return 'DECLINED';
  return '';
}

function getStatusBadgeColor(
  status: GetActiveOffersRequestResponseItem['status']
) {
  if (status === 'OPEN') return theme.brand.warning;
  if (status === 'ACCEPTED') return theme.brand.success;
  if (status === 'DECLINED') return theme.brand.error;
  if (status === 'CLOSED') return theme.brand.error;
  return '';
}

function setIcon(status: GetActiveOffersRequestResponseItem['status']) {
  if (status === 'OPEN')
    return <Sync width={10} height={10} fill={theme.grey.noshade} />;
  if (status === 'ACCEPTED')
    return <CheckFilled width={10} height={10} fill={theme.grey.noshade} />;
  if (status === 'DECLINED')
    return <CloseFilled width={10} height={10} fill={theme.grey.noshade} />;
  if (status === 'CLOSED')
    return <CheckFilled width={10} height={10} fill={theme.grey.noshade} />;
}

export default MarketBoardLandingView;
