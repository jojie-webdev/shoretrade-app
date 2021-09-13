import React from 'react';

import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import { ChevronRight } from 'components/base/SVG';
import Tabs from 'components/base/Tabs';
import Typography from 'components/base/Typography';
import { TypographyProps } from 'components/base/Typography/Typography.props';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { isNil, prop, sortBy, isEmpty } from 'ramda';
import { Col, Hidden, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import {
  getExpiry,
  getShippingAddress,
  getStatus,
  isOfferMade,
  isPaymentPending,
  isPaymentRequired,
  isRedLabel,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { getOfferStatus } from 'utils/MarketRequest/offerStatus';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import {
  Container,
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
    const offer = activeOffers?.find(
      (offer) => offer.marketRequest.id === data.id
    );

    return offer || ({} as Offer);
  };

  const statusTag = (
    badgeColor: string,
    badgeTextColor: TypographyProps['color'],
    text: string
  ) => (
    <StyledBadge className="badge" badgeColor={badgeColor}>
      <BadgeText
        variant="overlineSmall"
        color={badgeTextColor}
        style={{ lineHeight: '15px' }}
      >
        {text}
      </BadgeText>
    </StyledBadge>
  );

  const renderTagByStatus = () => {
    const offerStatus = getOfferStatus(getOfferByMarketRequest(), 'seller');

    // if (offerStatus === 'PAYMENT MISSED') {
    //   return statusTag(theme.brand.error, 'noshade', 'LOST');
    // }

    // if (offerStatus === 'PAYMENT REQUIRED') {
    //   return statusTag(theme.brand.warning, 'noshade', 'PENDING PAYMENT');
    // }

    if (offerStatus === 'NEW OFFER') {
      return statusTag(theme.brand.success, 'noshade', 'ACTIVE OFFER');
    }
  };

  const getOfferCount = () => {
    const offer = getOfferByMarketRequest();

    const initialOffer = 1;
    const totalOfferAndNegos = initialOffer + offer?.negotiations?.length;

    return totalOfferAndNegos;
  };

  const getCorrectOfferCountLabel = () => {
    const offerCount = getOfferCount();

    if (offerCount === 1) {
      return '1 OFFER';
    } else {
      return offerCount + ' OFFERS';
    }
  };

  return (
    <Interactions
      onClick={() => onClick()}
      leftComponent={
        <>
          <img src={parseImageUrl(data.image)} />
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
            <div style={{ display: 'flex' }}>
              {renderTagByStatus()}
              {getOfferCount() &&
                statusTag(
                  theme.grey.shade3,
                  'shade10',
                  getCorrectOfferCountLabel()
                )}
            </div>
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

  const sizeUnit =
    formatMeasurementUnit(data.measurementUnit) === 'kg' ? 'kg' : '';

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

  const buildTagByStatus = () => {
    const offerStatus = getOfferStatus(data, 'seller');

    const tag = (
      badgeColor: string,
      status: string,
      textColor: TypographyProps['color'] = 'noshade'
    ) => (
      <StyledBadge className="badge" badgeColor={badgeColor}>
        <BadgeText
          variant="overlineSmall"
          color={textColor}
          style={{ lineHeight: '15px' }}
        >
          {status}
        </BadgeText>
      </StyledBadge>
    );

    if (offerStatus === 'ACCEPTED') {
      return tag(theme.brand.success, 'FINALISED');
    }
    if (offerStatus === 'PAYMENT MISSED') {
      return tag(theme.brand.error, 'LOST');
    }
    if (offerStatus === 'DECLINED') {
      return tag(theme.brand.error, 'DECLINED');
    }
    if (offerStatus === 'PAYMENT REQUIRED') {
      return tag(theme.brand.warning, 'PENDING PAYMENT');
    }
    if (offerStatus === 'NEGOTIATION') {
      return tag(theme.brand.alert, 'NEGOTIATION', 'shade10');
    }
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
          <Col style={{ padding: '0 5px' }}>{buildTagByStatus()}</Col>
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
