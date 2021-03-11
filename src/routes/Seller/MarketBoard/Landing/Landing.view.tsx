import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Interactions from 'components/base/Interactions';
import SegmentedControls from 'components/base/SegmentedControls/SegmentedControls.view';
import { ArrowRight, DollarSign, Weight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BadgeText } from 'components/module/CategoryCards/Preview/Preview.style';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { MarketBoardLandingGeneratedProps, TabOptions } from './Landing.props';
import { Container } from './Landing.style';

const MarketBoardLandingView = (props: MarketBoardLandingGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();

  const getStatusBadgeColor = (
    status: GetActiveOffersRequestResponseItem['status']
  ) => {
    if (status === 'OPEN') return theme.brand.alert;
    if (status === 'ACCEPTED') return theme.brand.success;

    return theme.brand.error;
  };

  const getStatus = (status: GetActiveOffersRequestResponseItem['status']) => {
    if (status === 'OPEN') return 'NEGOTIATION';
    if (status === 'ACCEPTED') return 'ACCEPTED';

    return 'LOST';
  };

  return (
    <Container>
      <SegmentedControls
        options={['Buyer Requests', 'My Active Offers']}
        selectedOption={props.currentTab}
        onClickControl={(value) =>
          props.onChangeCurrentTab(value as TabOptions)
        }
      />

      <Row className="search-row">
        {props.currentTab === 'Buyer Requests' && (
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
            props.activeOffers.map((v, i) => (
              <Interactions
                key={i}
                onClick={() => props.onClickActiveOffer(v)}
                leftComponent={
                  <div className="left-component">
                    <img src={v.image} />
                    <div>
                      <Typography color="noshade">{v.name}</Typography>
                      <div className="badges-container">
                        <Badge
                          className="badge"
                          badgeColor={getStatusBadgeColor(v.status)}
                        >
                          <BadgeText
                            variant="overlineSmall"
                            color={v.status === 'OPEN' ? 'shade9' : 'noshade'}
                          >
                            {getStatus(v.status)}
                          </BadgeText>
                        </Badge>
                      </div>

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
            ))}
        </>
      )}
    </Container>
  );
};

export default MarketBoardLandingView;
