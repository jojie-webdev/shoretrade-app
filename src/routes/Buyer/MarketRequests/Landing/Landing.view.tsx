import React, { Dispatch, SetStateAction } from 'react';

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
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col, Visible, Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import Case from 'case'
import { useHistory } from 'react-router-dom';
import { Theme } from 'types/Theme';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { MarketRequestsLandingGeneratedProps, Result } from './Landing.props';
import {
  MarketRequestsContainer,
  MarketRequestItemContainer,
  MarketRequestItemInteraction,
  MarketRequestItemMobileContainer,
  StyledAlert,
  BadgeText,
  SizeTextContainer,
  MajorInfo,
  MinorInfo,
  SubMinorInfo,
  SubMinorDetail,
  SubText
} from './Landing.style';

export const MarketRequestItemNonMobile = (props: {
  expiry: string;
  offers: number;
  type: string;
  image: string;
  inDetail: boolean;
  weight?: { from: number; to: number };
  measurementUnit?: string;
  setItemToDelete?: Dispatch<SetStateAction<{ value: null | string }>>;
  id?: string;
  offerStatus?: string;
  specs?: string,
  size?: { from: number; to: number; options: any; ungraded: boolean }
}) => {
  const {
    id,
    inDetail,
    expiry,
    offers,
    offerStatus,
    type,
    image,
    measurementUnit,
    weight,
    specs,
    size,
    setItemToDelete
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const offerNumberBadge = () => {
    return (
      <Badge className="offers-badge" badgeColor={theme.grey.shade3}>
        <BadgeText
          weight="bold"
          variant="overline"
          empty={!offers || offers === 0}
        >
          {`${offers > 0 ? offers : 'No'} Offers`}
        </BadgeText>
      </Badge>
    );
  };

  const offerStatusBadge = () => {
    let badgeColor = '';
    let textColor;
    switch (offerStatus) {
      case 'NEW OFFER':
        badgeColor = '#EAFFF9';
        textColor = theme.brand.success;
        break;
      case 'NEGOTIATION':
        badgeColor = '#FFFBF2';
        textColor = theme.brand.alert;
        break;
    }
    if (inDetail || offers < 1) return '';

    return (
      <Badge className="offers-badge" badgeColor={badgeColor}>
        <BadgeText
          weight="bold"
          variant="overline"
          style={{ color: textColor }}
        >
          {offerStatus}
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
        <div className="sub-group">
          <TypographyView variant="body">{type}</TypographyView>
          <SubText variant="small">
            {specs}
          </SubText>
        </div>
        <div className="sub-group">
          <SubText variant="small">
            {Array.isArray(size?.options) ? size?.options?.join(', ') : ''}
          </SubText>
          <SubText variant="small">
            {weight && `Qty: ${weight.from} - ${weight.to}`}
          </SubText>
        </div>
        <div className="sub-group">
          <SubText
            variant="small"
            color={expiry === 'Expired' ? 'error' : 'primary'}
          >
            {expiry === 'Expired' ? expiry : `${expiry} left`}
          </SubText>
        </div>
        <div className="sub-group">
          <SubText variant="small">{offerNumberBadge()}</SubText>
        </div>
        <div className="sub-group">
          <SubText variant="small">{offerStatusBadge()}</SubText>
        </div>
        <div className="sub-group">
          <Button
            iconPosition="before"
            icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
            onClick={
              setItemToDelete &&
              ((e) => {
                e.stopPropagation();
                setItemToDelete({ value: id || '' });
              })
            }
            variant="primary"
            size="sm"
            className="delete-button"
          />
        </div>
      </div>
    </MarketRequestItemContainer>
  );
};

export const MarketRequestItemMobile = (props: {
  expiry: string;
  offers: number;
  type: string;
  image: string;
  inDetail: boolean;
  weight?: { from: number; to: number };
  measurementUnit?: string;
  specs?: string;
  size?: { from: number; to: number; options: any; ungraded: boolean };
  offerStatus?: string;
}) => {
  const {
    inDetail,
    expiry,
    offers,
    type,
    image,
    measurementUnit,
    weight,
    specs,
    size,
    offerStatus
  } = props;

  const offersText = offers > 1 ? `${offers} Offers` : `1 Offer`;

  const getRightExpiryToDisplay = () => {
    const splits = expiry.split(" ")
    let rightExpiryToDisplay = splits.slice(0, 2)

    if (rightExpiryToDisplay.join(' ') === '0 Day') {
      rightExpiryToDisplay = splits.slice(2, 4)
    }

    if (rightExpiryToDisplay.join(' ') === '0 Hours') {
      rightExpiryToDisplay = splits.slice(4, 6)
    }

    if (rightExpiryToDisplay.join(' ') === '0 Minutes') {
      rightExpiryToDisplay = ["0"]
    }

    return rightExpiryToDisplay.join(' ')
  }

  const offerStatusBadge = () => {
    let badgeColor = '';
    let textColor;
    switch (offerStatus) {
      case 'NEW OFFER':
        badgeColor = '#EAFFF9';
        textColor = theme.brand.success;
        break;
      case 'NEGOTIATION':
        badgeColor = '#FFFBF2';
        textColor = theme.brand.alert;
        break;
    }
    if (inDetail || offers < 1) return '';

    return (
      <Badge className="offers-badge" badgeColor={badgeColor}>
        <BadgeText
          weight="bold"
          variant="overline"
          style={{ color: textColor }}
        >
          {offerStatus}
        </BadgeText>
      </Badge>
    );
  };

  const offersMarkup = () => {
    if (inDetail || offers < 1) return '';

    return (
      <div>
        <Badge className="offers-badge" badgeColor={theme.grey.shade3} padding="8px 8px" borderRadius="8px">
          <BadgeText color="success" weight="bold" variant="overline">
            {offersText}
          </BadgeText>
        </Badge>
      </div>
    );
  };

  const newOfferMarkup = () => {
    if (inDetail || offers < 1) return '';

    return (
      <div>
        <Badge className="offers-badge" badgeColor={theme.grey.shade3} padding="8px 8px" borderRadius="8px">
          <BadgeText color="shade10" weight="bold" variant="overline">
            {offersText}
          </BadgeText>
        </Badge>
      </div>
    );
  };

  const subMinorDetail = (label: string, value: string) => (
    <>
      <Typography variant="caption" weight="400" color="shade6" style={{ marginRight: "5px" }}>
        {label} {' '}
      </Typography>
      <Typography variant="caption" weight="700" color="shade9">
        {value}
      </Typography>
    </>
  )

  return (
    <MarketRequestItemMobileContainer>
      <MajorInfo>
        <div className="thumbnail-container">
          <img src={parseImageUrl(image)} />
        </div>

        <TypographyView
          variant="label"
          style={{ lineHeight: '20px' }}
        >
          {type}
        </TypographyView>
      </MajorInfo>

      <MinorInfo>
        <Typography variant="caption" weight="400" color="shade6">
          {specs}
        </Typography>

        <SubMinorInfo>
          <SubMinorDetail>
            {subMinorDetail('Quantity', weight?.from + "-" + weight?.to + " " + Case.pascal(measurementUnit || ''))}
          </SubMinorDetail>

          <SubMinorDetail>
            {subMinorDetail('Time Left', getRightExpiryToDisplay())}
          </SubMinorDetail>

          <SubMinorDetail>
            {subMinorDetail('Size', '')}
          </SubMinorDetail>
        </SubMinorInfo>

        <div style={{ display: "flex", marginTop: "10px" }}>
          {offersMarkup()}
          {offerStatusBadge()}
        </div>
      </MinorInfo>
    </MarketRequestItemMobileContainer>
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

  const renderMobile = () => (
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
                <MarketRequestItemMobile
                  inDetail={false}
                  image={mr.image}
                  offers={mr.offers}
                  expiry={mr.expiry}
                  type={mr.type}
                  weight={mr.weight}
                  measurementUnit={mr.measurementUnit}
                  specs={mr.specs}
                  size={mr.size}
                />
              ),
              rightComponent: (
                <div style={{ width: '100px' }}>
                  <div style={{ paddingLeft: "0px 0px 0px auto" }}>test</div>
                </div>
              )
            };
          })}
        />
      ) : (
        <EmptyStateView Svg={Crab} height={240} width={249} fluid />
      )}
    </Visible>
  )

  const renderNonMobile = () => (
    <Hidden xs>
      {marketRequests.length > 0 ? (
        marketRequests.map((mr) => (
          <MarketRequestItemInteraction
            key={mr.id}
            type={mr.offers > 0 ? 'next' : 'none'}
            onClick={() => onClickItem(mr)}
            leftComponent={
              <MarketRequestItemNonMobile
                inDetail={false}
                setItemToDelete={setItemToDelete}
                {...mr}
              />
            }
            keepIcon
          />
        ))
      ) : (
        <EmptyStateView Svg={Crab} height={240} width={249} fluid />
      )}
    </Hidden>
  )

  // const renderSDF = () => {
  //   {
  //     marketRequests.length > 0 ? (
  //       marketRequests.map((mr) => (
  //         <MarketRequestItemInteraction
  //           key={mr.id}
  //           type={'next'}
  //           onClick={() => onClickItem(mr)}
  //           leftComponent={
  //             <MarketRequestItemNonMobile
  //               inDetail={false}
  //               setItemToDelete={setItemToDelete}
  //               {...mr}
  //             />
  //           }
  //           keepIcon
  //         />
  //       ))
  //     ) : (
  //     <EmptyStateView Svg={Crab} height={240} width={249} fluid />
  //   )
  //   }
  // }

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
      {/* {renderSDF()} */}
      {renderMobile()}
      {renderNonMobile()}
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
