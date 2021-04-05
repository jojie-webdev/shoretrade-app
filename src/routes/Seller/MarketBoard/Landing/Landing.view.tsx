import React from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge/Badge.view';
import Interactions from 'components/base/Interactions';
import SegmentedControls from 'components/base/SegmentedControls/SegmentedControls.view';
import { ArrowRight, DollarSign, Filter, Weight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BadgeText } from 'components/module/CategoryCards/Preview/Preview.style';
import FilterModal from 'components/module/FilterModal';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { getExpiry } from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import { Container, FilterButton } from './Landing.style';

const MarketBoardLandingView = (props: MarketBoardLandingGeneratedProps) => {
  const theme = useTheme();

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

  const getSizeBadge = (buyerRequest: GetAllMarketRequestResponseItem) => {
    if (!isEmpty(buyerRequest.sizeOptions)) {
      return buyerRequest.sizeOptions;
    }

    return (
      `${buyerRequest.sizeFrom}${
        buyerRequest.sizeTo !== null ? ` - ${buyerRequest.sizeTo}` : ''
      }` || 'Ungraded'
    );
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

      <SegmentedControls
        options={['Buyer Requests', 'My Active Offers']}
        selectedOption={props.currentTab}
        onClickControl={(value) =>
          props.onChangeCurrentTab(value as TabOptions)
        }
      />

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
                placeholder="Search for any product..."
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
                    <img src={b.image} />
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
                            <BadgeText variant="overlineSmall" color="noshade">
                              {s.stateName}
                            </BadgeText>
                          </Badge>
                        ))}
                      </div>

                      {b.sizeFrom !== null ? (
                        <div className="weights">
                          <Typography color="noshade" variant="small">
                            {b.sizeFrom || ''}
                            {formatMeasurementUnit(b.metric)}
                          </Typography>
                          <div style={{ margin: '0 6px' }}>-</div>
                          <Typography color="noshade" variant="small">
                            {b.sizeTo || ''}
                            {formatMeasurementUnit(b.metric)}
                          </Typography>
                        </div>
                      ) : b.sizeOptions == null &&
                        b.sizeTo == null &&
                        b.sizeFrom == null ? (
                        <div className="badges-container">
                          <Badge
                            className="badge"
                            badgeColor={theme.grey.shade8}
                          >
                            <BadgeText variant="overlineSmall" color="noshade">
                              Ungraded
                            </BadgeText>
                          </Badge>
                        </div>
                      ) : (
                        <div className="badges-container">
                          {b.sizeOptions.map((opt: any, idx: number) => (
                            <Badge
                              key={idx}
                              className="badge"
                              badgeColor={theme.grey.shade8}
                            >
                              <BadgeText
                                variant="overlineSmall"
                                color="noshade"
                              >
                                {opt}
                              </BadgeText>
                            </Badge>
                          ))}
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
                      <img src={v.image} />
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
                            </Badge>
                          </div>
                        )}

                        <div className="weights">
                          <div style={{ margin: '0 4px 4px 0' }}>
                            <Weight
                              fill={theme.grey.noshade}
                              width={12}
                              height={12}
                            />
                          </div>
                          <Typography color="noshade" variant="small">
                            {v.weight}
                            {formatMeasurementUnit(v.measurementUnit)}
                          </Typography>
                          <div style={{ margin: '0 2px 4px 8px' }}>
                            <DollarSign
                              fill={theme.grey.noshade}
                              width={11}
                              height={11}
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
