import React from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge/Badge.view';
import Interactions from 'components/base/Interactions';
import SegmentedControlsV2 from 'components/base/SegmentedControlsV2';
import {
  ArrowRight,
  DollarSign,
  Filter,
  Weight,
  Sync,
  CheckFilled,
  CloseFilled,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FilterModal from 'components/module/FilterModal';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { BuyerRequestsTooltip } from 'routes/Seller/MarketBoard/Landing/Landing.constants';
import { getExpiry } from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import { Container, FilterButton, BadgeText } from './Landing.style';

const MarketBoardLandingView = (props: MarketBoardLandingGeneratedProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const isIpadPro = useMediaQuery({ query: BREAKPOINTS['xl'] });
  const isIpad = useMediaQuery({ query: BREAKPOINTS['iPad'] });
  const getStatusBadgeColor = (
    status: GetActiveOffersRequestResponseItem['status']
  ) => {
    if (status === 'OPEN') return theme.brand.warning;
    if (status === 'ACCEPTED') return theme.brand.success;
    if (status === 'DECLINED') return theme.brand.error;

    return '';
  };

  const getStatus = (status: GetActiveOffersRequestResponseItem['status']) => {
    if (status === 'OPEN') return 'NEGOTIATION';
    if (status === 'ACCEPTED') return 'ACCEPTED';
    if (status === 'DECLINED') return 'LOST';

    return '';
  };

  const setIcon = (status: GetActiveOffersRequestResponseItem['status']) => {
    if (status === 'OPEN')
      return <Sync width={10} height={10} fill={theme.grey.shade9} />;
    if (status === 'ACCEPTED')
      return <CheckFilled width={10} height={10} fill={theme.grey.noshade} />;
    if (status === 'DECLINED')
      return <CloseFilled width={10} height={10} fill={theme.grey.noshade} />;
  };

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
      {isMobile && (
        <Typography className="title-board" variant="title5" color="noshade">
          Market Board
        </Typography>
      )}
      <SegmentedControlsV2
        options={['Buyer Requests', 'My Active Offers']}
        selectedOption={props.currentTab}
        onClickControl={(value) =>
          props.onChangeCurrentTab(value as TabOptions)
        }
        tooltips={[{ option: 'Buyer Requests', value: BuyerRequestsTooltip }]}
      >
        {!isMobile && props.currentTab === 'Buyer Requests' && (
          <>
            <Search
              className="search"
              value={props.searchTerm}
              onChange={(event: any) =>
                props.setSearchTerm(event.currentTarget.value)
              }
              resetValue={() => props.setSearchTerm('')}
              placeholder="Search order"
              rounded
            />
            {!isIpad && (
              <FilterButton onClick={props.onClickFilterButton}>
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
          </>
        )}
      </SegmentedControlsV2>
      {(isIpadPro || isIpad) && (
        <div className="filter-ipad-container">
          <FilterButton onClick={props.onClickFilterButton}>
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
        </div>
      )}
      {isMobile && (
        <Row nogutter className="search-row" justify="between">
          {props.currentTab === 'Buyer Requests' && (
            <>
              <Col xl={4}>
                <Search
                  className="filter-search"
                  value={props.searchTerm}
                  onChange={(event: any) =>
                    props.setSearchTerm(event.currentTarget.value)
                  }
                  resetValue={() => props.setSearchTerm('')}
                  placeholder="Search order"
                  rounded
                />
              </Col>

              <FilterButton onClick={props.onClickFilterButton}>
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
            </>
          )}
        </Row>
      )}

      {props.isLoading ? (
        <Loading />
      ) : (
        <>
          {props.currentTab === 'Buyer Requests' &&
            props.buyerRequests.map((b) => (
              <Interactions
                key={b.id}
                onClick={() => props.onClickOffer(b)}
                leftComponent={
                  <div className="left-component">
                    <img src={parseImageUrl(b.image)} />
                    <div>
                      <Typography color="noshade">{b.type}</Typography>
                      <Typography
                        className="expiry"
                        color="error"
                        variant="caption"
                      >
                        {getExpiry(b.createdAt)}
                      </Typography>
                      <div className="badges-container">
                        {b.specifications.map((s) => (
                          <Badge
                            key={s.stateId}
                            className="badge"
                            badgeColor={theme.grey.shade8}
                          >
                            <BadgeText
                              variant={isMobile ? 'small' : 'overlineSmall'}
                              color="noshade"
                            >
                              {s.stateName}
                            </BadgeText>
                          </Badge>
                        ))}
                      </div>

                      {Object.keys(b.sizeOptions).length != 0 ? (
                        <div className="badges-container">
                          {b.sizeOptions.map((opt: any, idx: number) => (
                            <Badge
                              key={idx}
                              className="badge"
                              badgeColor={theme.grey.shade8}
                            >
                              <BadgeText
                                variant={isMobile ? 'small' : 'overlineSmall'}
                                color="noshade"
                              >
                                {opt}
                              </BadgeText>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <div className="weights">
                          <Typography color="noshade" variant="small">
                            {sizeToString(
                              b.metric,
                              (b.sizeFrom || '').toString(),
                              (b.sizeTo || '').toString()
                            )}
                          </Typography>
                        </div>
                      )}

                      <div className="weights">
                        <Typography color="noshade" variant="small">
                          {b.weight?.from || ''}
                          {formatMeasurementUnit(b.measurementUnit)}
                        </Typography>
                        <div style={{ margin: '0 6px' }}>
                          <ArrowRight
                            width={10}
                            height={10}
                            fill={theme.grey.shade7}
                          />
                        </div>

                        <Typography color="noshade" variant="small">
                          {b.weight?.to || ''}
                          {formatMeasurementUnit(b.measurementUnit)}
                        </Typography>
                      </div>

                      <div className="shipping-to">
                        <Typography variant="small" color="shade6">
                          Shipping to
                        </Typography>
                        <Typography
                          variant="small"
                          color="noshade"
                          weight="bold"
                        >
                          {`${b.shippingTo.suburb}, ${b.shippingTo.state} ${b.shippingTo.postcode}`}
                        </Typography>
                      </div>
                    </div>
                  </div>
                }
                padding="16px 24px 16px 16px"
              />
            ))}

          {props.currentTab === 'My Active Offers' &&
            props.activeOffers.map((v, i) => {
              const status = getStatus(v.status);

              return (
                <Interactions
                  key={i}
                  onClick={() => props.onClickActiveOffer(v)}
                  leftComponent={
                    <div className="left-component">
                      <img src={parseImageUrl(v.image)} />
                      <div>
                        <Typography color="noshade">{v.name}</Typography>
                        <Typography
                          className="expiry"
                          color="error"
                          variant="caption"
                        >
                          {getExpiry(v.marketRequest.createdAt)}
                        </Typography>

                        {status && (
                          <div className="badges-container">
                            <Badge
                              className="badge"
                              badgeColor={getStatusBadgeColor(v.status)}
                            >
                              <BadgeText
                                variant="overlineSmall"
                                color={
                                  v.status === 'OPEN' ? 'shade9' : 'noshade'
                                }
                              >
                                {status}
                              </BadgeText>
                              <div className="svg-container">
                                {setIcon(v.status)}
                              </div>
                            </Badge>
                          </div>
                        )}

                        <div className="weights">
                          <div style={{ margin: '0 4px 4px 0' }}>
                            <Weight
                              fill={theme.grey.shade7}
                              width={13.33}
                              height={13.33}
                            />
                          </div>
                          <Typography color="noshade" variant="small">
                            {v.weight}
                            {formatMeasurementUnit(v.measurementUnit)}
                          </Typography>
                          <div style={{ margin: '0 2px 4px 8px' }}>
                            <DollarSign
                              fill={theme.grey.shade7}
                              width={13.33}
                              height={13.33}
                            />
                          </div>
                          <Typography color="noshade" variant="small">
                            {v.price}/{formatMeasurementUnit(v.measurementUnit)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  }
                  padding="16px 24px 16px 16px"
                />
              );
            })}
        </>
      )}

      <FilterModal {...props.filterModalProps} />
    </Container>
  );
};

export default MarketBoardLandingView;
