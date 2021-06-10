import React from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import { Filter, Crab, TrashCan } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyStateView from 'components/module/EmptyState';
import LoadingView from 'components/module/Loading';
import SwipeableInteractionsView from 'components/module/SwipeableInteraction';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Visible, Hidden } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import {
  MarketRequestsContainer,
  MarketRequestItemContainer,
  MarketRequestItemInteraction,
  SizeTextContainer,
  StyledAlert,
  BadgeText,
} from './Landing.style';

export const MarketRequestItem = (props: {
  expiry: string;
  offers: number;
  type: string;
  image: string;
  inDetail: boolean;
  weight?: { from: number; to: number };
  measurementUnit?: string;
}) => {
  const {
    inDetail,
    expiry,
    offers,
    type,
    image,
    measurementUnit,
    weight,
  } = props;
  const offersText = `${offers} Offers`;

  const offersMarkup = () => {
    if (inDetail || offers < 1) return '';
    return (
      <Badge className="offers-badge" badgeColor={theme.brand.success}>
        <BadgeText color="shade1" weight="bold" variant="overline">
          {offersText}
        </BadgeText>
      </Badge>
    );
  };

  return (
    <MarketRequestItemContainer>
      <div className="thumbnail-container">
        <img src={parseImageUrl(image)} />
      </div>
      <div className="info-container">
        <TypographyView variant="body">{type}</TypographyView>
        {weight && measurementUnit ? (
          <SizeTextContainer>
            <TypographyView variant="body">{weight?.from}</TypographyView>
            <TypographyView variant="body" color="shade6">
              <span className="over-divider">/</span>
              {weight?.to} {formatMeasurementUnit(measurementUnit)}
            </TypographyView>
          </SizeTextContainer>
        ) : (
          ''
        )}
        {expiry === 'Expired' ? (
          <TypographyView
            style={{ fontStyle: 'italic' }}
            color="error"
            className="time"
          >
            {expiry}
          </TypographyView>
        ) : (
          <TypographyView color="shade6" className="time">
            {expiry}
          </TypographyView>
        )}
        {offersMarkup()}
      </div>
    </MarketRequestItemContainer>
  );
};

const MarketRequestsLandingView = (
  props: MarketRequestsLandingGeneratedProps
) => {
  const history = useHistory();
  const {
    marketRequests,
    onClickItem,
    onDelete,
    itemToDelete,
    setItemToDelete,
    pendingDeleteMarketRequest,
    loading,
  } = props;

  if (pendingDeleteMarketRequest || loading) {
    return <LoadingView />;
  }

  return (
    <MarketRequestsContainer>
      <ConfirmationModal
        isOpen={itemToDelete.value !== null}
        title="Delete Market Request"
        description="Are you sure you want to delete this market request?"
        action={() => {
          onDelete && itemToDelete.value && onDelete(itemToDelete.value);
        }}
        actionText="DELETE"
        onClickClose={() => setItemToDelete({ value: null })}
      />

      <Row nogutter>
        <StyledAlert
          content={'All offers below include shipping costs'}
          variant="info"
          alignText="center"
          fullWidth
        />
      </Row>
      <Row nogutter justify="around" align="center" className="header">
        <Col>
          <Typography variant="overline" color="shade6">
            My Requests
          </Typography>
          <Visible xs>
            <TypographyView variant="label" color="shade9">
              Swipe right to delete a request
            </TypographyView>
          </Visible>
        </Col>
        <Col xs="content">
          <Visible sm md lg xl xxl>
            <Button
              onClick={() => history.push(BUYER_ROUTES.CREATE_MARKET_REQUEST)}
              text="CREATE MARKET REQUEST"
              variant={props.isPendingAccount ? 'disabled' : 'primary'}
              size="md"
              disabled={props.isPendingAccount}
            />
          </Visible>
        </Col>
      </Row>
      <Hidden xs>
        {marketRequests.length > 0 ? (
          marketRequests.map((mr) => (
            <MarketRequestItemInteraction
              key={mr.id}
              type={mr.offers > 0 ? 'next' : 'none'}
              onClick={() => onClickItem(mr)}
              leftComponent={
                <MarketRequestItem
                  inDetail={false}
                  image={mr.image}
                  offers={mr.offers}
                  expiry={mr.expiry}
                  type={mr.type}
                />
              }
            />
          ))
        ) : (
          <EmptyStateView Svg={Crab} height={240} width={249} fluid />
        )}
      </Hidden>
      <Visible xs>
        {marketRequests.length > 0 ? (
          <SwipeableInteractionsView
            swipeActionIcon={<TrashCan fill={'#FFF'} width={16} height={16} />}
            swipeActionLabel="Delete"
            onSwipeTrigger={(id) => setItemToDelete({ value: id })}
            data={marketRequests.map((mr) => {
              return {
                id: mr.id,
                type: mr.offers > 0 ? 'next' : 'none',
                onClick: () => onClickItem(mr),
                leftComponent: (
                  <MarketRequestItem
                    inDetail={false}
                    image={mr.image}
                    offers={mr.offers}
                    expiry={mr.expiry}
                    type={mr.type}
                  />
                ),
              };
            })}
          />
        ) : (
          <EmptyStateView Svg={Crab} height={240} width={249} fluid />
        )}
      </Visible>
      <MobileFooter>
        <Button
          onClick={() => history.push(BUYER_ROUTES.CREATE_MARKET_REQUEST)}
          text="CREATE MARKET REQUEST"
          variant={props.isPendingAccount ? 'disabled' : 'primary'}
          takeFullWidth
          disabled={props.isPendingAccount}
        />
      </MobileFooter>
    </MarketRequestsContainer>
  );
};

export default MarketRequestsLandingView;
