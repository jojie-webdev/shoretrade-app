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
import { isEmpty, isNil } from 'ramda';
import { useMediaQuery } from 'react-responsive';
import { BuyerRequestsTooltip } from 'routes/Seller/MarketBoard/Landing/Landing.constants';
import { getExpiry } from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import { Container, FilterButton, BadgeText } from './Landing.style';

const BuyerRequestsInteractions = (props: {
  onClick: () => void;
  data: GetAllMarketRequestResponseItem;
}) => {
  const { onClick, data } = props;
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
          </div>
          <div className="section">
            <Typography variant="caption" color="shade6">
              Shipping to: {data?.shippingTo?.suburb}, {data?.shippingTo?.state}{' '}
              {data?.shippingTo?.postcode}
            </Typography>
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
}) => {
  const theme = useTheme();
  const { onClick, data } = props;

  const getStatus = (status: GetActiveOffersRequestResponseItem['status']) => {
    if (status === 'OPEN') return 'NEGOTIATION';
    if (status === 'ACCEPTED') return 'ACCEPTED';
    if (status === 'DECLINED') return 'LOST';
    if (status === 'CLOSED') return 'CLOSED';
    return '';
  };

  const getStatusBadgeColor = (
    status: GetActiveOffersRequestResponseItem['status']
  ) => {
    if (status === 'OPEN') return theme.brand.warning;
    if (status === 'ACCEPTED') return theme.brand.success;
    if (status === 'DECLINED') return theme.brand.error;
    if (status === 'CLOSED') return theme.brand.error;
    return '';
  };

  const setIcon = (status: GetActiveOffersRequestResponseItem['status']) => {
    if (status === 'OPEN')
      return <Sync width={10} height={10} fill={theme.grey.shade9} />;
    if (status === 'ACCEPTED')
      return <CheckFilled width={10} height={10} fill={theme.grey.noshade} />;
    if (status === 'DECLINED')
      return <CloseFilled width={10} height={10} fill={theme.grey.noshade} />;
    if (status === 'CLOSED')
      return <CheckFilled width={10} height={10} fill={theme.grey.noshade} />;
  };

  const status = getStatus(data.status);
  const sizeUnit =
    formatMeasurementUnit(data.measurementUnit) === 'kg' ? 'kg' : '';

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
              Price: {data.price}/{formatMeasurementUnit(data.measurementUnit)}
            </Typography>
          </div>
          <div className="section">
            <Typography variant="caption" color="shade6">
              {getExpiry(data.marketRequest.createdAt)}
            </Typography>
          </div>
          <div className="section">
            {status && (
              <Badge
                className="badge"
                badgeColor={getStatusBadgeColor(data.status)}
              >
                <BadgeText
                  variant="overlineSmall"
                  color={data.status === 'OPEN' ? 'shade9' : 'noshade'}
                >
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
                  />
                ))}

                <div style={{ marginBottom: 32 }} />
              </>
            )}

          {props.currentTab === 'Buyer Requests' && (
            <Typography
              variant="overlineSmall"
              color="shade7"
              style={{ marginBottom: 12 }}
            >
              All Products
            </Typography>
          )}

          {props.currentTab === 'Buyer Requests' &&
            !isNil(props.buyerRequests) &&
            props.buyerRequests.map((data) => (
              <BuyerRequestsInteractions
                key={data.id}
                onClick={() => props.onClickOffer(data)}
                data={data}
              />
            ))}

          {props.currentTab === 'My Active Offers' &&
            !isNil(props.activeOffers) &&
            props.activeOffers.map((data, i) => (
              <MyActiveOffersInteractions
                key={data.id}
                onClick={() => props.onClickActiveOffer(data)}
                data={data}
              />
            ))}
        </>
      )}

      {/*<FilterModal {...props.filterModalProps} isBuyerRequestFilters />*/}
    </Container>
  );
};

export default MarketBoardLandingView;
