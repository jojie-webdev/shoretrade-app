import React, { Dispatch, SetStateAction, useState } from 'react';

import Case from 'case';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import { Crab, TrashCan, ChevronRight } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyStateView from 'components/module/EmptyState';
import LoadingView from 'components/module/Loading';
import TermsAndCondition from 'components/module/TermsAndCondition';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col, Visible, Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';
import useLocalStorage from 'utils/Hooks/useLocalStorage';
import { sizeToString } from 'utils/Listing';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { MarketRequestsLandingGeneratedProps } from './Landing.props';
import {
  MarketRequestsContainer,
  MarketRequestItemContainer,
  MarketRequestItemInteraction,
  MarketRequestItemMobileContainer,
  BadgeText,
  MajorInfo,
  MinorInfo,
  SubMinorInfo,
  Badges,
  SubMinorDetail,
  SubText,
  BadgesContainer,
} from './Landing.style';

export const MarketRequestItemNonMobile = (props: {
  expiry: string;
  offers: number;
  type: string;
  image: string;
  inDetail: boolean;
  activeOffersData: GetActiveOffersRequestResponseItem[];
  metric: string;
  paymentRequired: boolean;
  weight?: { from: number; to: number };
  measurementUnit?: string;
  setItemToDelete?: Dispatch<SetStateAction<{ value: null | string }>>;
  id?: string;
  offerStatus?: string;
  specs?: string;
  size?: { from: number; to: number; options: any; ungraded: boolean };
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
    setItemToDelete,
    activeOffersData,
    metric,
    paymentRequired,
  } = props;

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const offerNumberBadge = () => {
    return (
      <Badge className="offers-badge" badgeColor={theme.grey.shade3}>
        <BadgeText variant="overline" empty={!offers || offers === 0}>
          {`${offers > 0 ? offers : 'No'} ${offers === 1 ? 'Offer' : 'Offers'}`}
        </BadgeText>
      </Badge>
    );
  };

  const getOfferById = (): Offer => {
    activeOffersData.forEach((activeOffer) => {
      activeOffer.offers.forEach((offer) => {
        if (offer.id === id) {
          return offer;
        }
      });
    });

    return {} as Offer;
  };

  return (
    <MarketRequestItemContainer>
      <div className="thumbnail-container">
        <img src={parseImageUrl(image)} />
      </div>
      <div className="info-container">
        <div className="sub-group">
          <TypographyView variant="label">{type}</TypographyView>
          <SubText variant="caption">{specs?.split(',').join(', ')}</SubText>
        </div>
        <div className="sub-group">
          {buildSize(metric, size?.to?.toString(), size?.from?.toString()) && (
            <SubText variant="caption">{`Size: ${buildSize(
              metric,
              size?.to?.toString(),
              size?.from?.toString()
            )}`}</SubText>
          )}
          <SubText variant="caption">
            {weight &&
              `Qty: ${weight.from}${measurementUnit?.toLocaleLowerCase()} ~ ${
                weight.to
              }${measurementUnit?.toLocaleLowerCase()}`}
          </SubText>
        </div>
        <div className="sub-group">
          <SubText
            variant="caption"
            color={expiry === 'Expired' ? 'error' : 'primary'}
          >
            {expiry === 'Expired' ? expiry : `${expiry} left`}
          </SubText>
        </div>
        <BadgesContainer>
          <div className="sub-group">
            <SubText variant="small">{offerNumberBadge()}</SubText>
          </div>
          <div className="sub-group">
            <SubText variant="small">
              {paymentRequired
                ? renderPaymentRequiredBadge()
                : offerStatusBadge(inDetail, offers, offerStatus)}
            </SubText>
          </div>
        </BadgesContainer>
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
  metric: string;
  paymentRequired: boolean;
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
    metric,
    offerStatus,
    paymentRequired,
  } = props;

  const offersText = offers === 1 ? `1 Offer` : `${offers || 'No'} Offers`;

  const offersMarkup = () => {
    if (inDetail) return '';

    return (
      <div>
        <Badge
          className="offers-badge"
          badgeColor={theme.grey.shade3}
          padding="8px 8px"
          borderRadius="8px"
        >
          <BadgeText
            color="success"
            variant="overline"
            empty={!offers || offers === 0}
          >
            {offersText}
          </BadgeText>
        </Badge>
      </div>
    );
  };

  const subMinorDetail = (label: string, value: string) => (
    <>
      <Typography
        variant="caption"
        weight="400"
        color="shade6"
        style={{ marginRight: '5px' }}
      >
        {label}{' '}
      </Typography>
      <Typography variant="caption" weight="700" color="shade9">
        {value}
      </Typography>
    </>
  );

  const displayBadges = () => {
    return (
      <Badges>
        {offersMarkup()}
        {paymentRequired
          ? renderPaymentRequiredBadge()
          : offerStatusBadge(inDetail, offers, offerStatus)}
      </Badges>
    );
  };

  return (
    <MarketRequestItemMobileContainer>
      <MajorInfo>
        <div className="thumbnail-container">
          <img src={parseImageUrl(image)} />
        </div>

        <TypographyView variant="label" style={{ lineHeight: '20px' }}>
          {type}
        </TypographyView>
      </MajorInfo>

      <MinorInfo>
        <Typography variant="caption" weight="400" color="shade6">
          {specs?.split(',').join(', ')}
        </Typography>

        <SubMinorInfo>
          <SubMinorDetail>
            {subMinorDetail(
              'Quantity',
              weight?.from +
                '-' +
                weight?.to +
                ' ' +
                Case.pascal(measurementUnit || '')
            )}
          </SubMinorDetail>

          <SubMinorDetail>{subMinorDetail('Time Left', expiry)}</SubMinorDetail>

          <SubMinorDetail>
            {subMinorDetail(
              'Size',
              buildSize(metric, size?.to?.toString(), size?.from?.toString()) ||
                'None'
            )}
          </SubMinorDetail>
        </SubMinorInfo>

        {displayBadges()}
      </MinorInfo>
    </MarketRequestItemMobileContainer>
  );
};

const renderPaymentRequiredBadge = () => (
  <Badge className="offers-badge" badgeColor="#FFF4F6" padding="8px 8px">
    <BadgeText variant="overline" style={{ color: theme.brand.error }}>
      PAYMENT REQUIRED
    </BadgeText>
  </Badge>
);

const offerStatusBadge = (
  inDetail: boolean,
  offers: number,
  offerStatus: any
) => {
  let badgeColor = '';
  let textColor;

  if (!offerStatus) {
    return null;
  }

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

  if (inDetail || offers < 1) return null;

  return (
    <Badge className="offers-badge" badgeColor={badgeColor} padding="8px 8px">
      <BadgeText variant="overline" style={{ color: textColor }}>
        {offerStatus}
      </BadgeText>
    </Badge>
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
    activeOffersData,
  } = props;

  const [isAcceptClicked, setIsAcceptClicked] = useLocalStorage(
    'isTermsAndConAccepted',
    false
  );

  if (pendingDeleteMarketRequest || loading) {
    return <LoadingView />;
  }

  const renderMobile = () => (
    <Visible xs>
      {marketRequests?.length > 0 ? (
        marketRequests?.map((mr) => (
          <MarketRequestItemInteraction
            key={mr.id}
            type={mr.offers > 0 ? 'next' : 'none'}
            onClick={() => onClickItem(mr)}
            offers={mr.offers}
            leftComponent={<MarketRequestItemMobile inDetail={false} {...mr} />}
            rightComponent={
              <div className="cta">
                <div>
                  <ChevronRight width={8} height={12} />
                </div>
                <Button
                  iconPosition="before"
                  icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                  onClick={
                    setItemToDelete &&
                    ((e) => {
                      e.stopPropagation();
                      setItemToDelete({ value: mr.id || '' });
                    })
                  }
                  variant="primary"
                  size="sm"
                  className="delete-button"
                />
              </div>
            }
          />
        ))
      ) : (
        <EmptyStateView Svg={Crab} height={240} width={249} fluid />
      )}
    </Visible>
  );

  const renderNonMobile = () => (
    <Hidden xs>
      {marketRequests?.length > 0 ? (
        marketRequests?.map((mr) => (
          <MarketRequestItemInteraction
            key={mr.id}
            type={'next'}
            onClick={() => onClickItem(mr)}
            offers={mr.offers}
            leftComponent={
              <MarketRequestItemNonMobile
                activeOffersData={activeOffersData}
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
  );

  if (!isAcceptClicked) {
    return (
      <TermsAndCondition
        appType="buyer"
        textWeb1="Can’t find your product?"
        textWeb2="Create a new Market Request"
        textMobile1="Market Request"
        textMobile2="Can’t find your product?"
        textMobile3="Create a new Market Request"
        cardText1={
          'Search in our Database and choose between more than 50+  Categories'
        }
        cardText2={
          'Select specifications, size, quantity and send your request to the market'
        }
        cardText3={
          'Check and negotiate offers from more than 10.000+ sellers from ShoreTrade'
        }
        isAcceptClicked={isAcceptClicked}
        setIsAcceptClicked={setIsAcceptClicked}
      />
    );
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

      <Row nogutter justify="around" align="center" className="header">
        <Col>
          <Hidden xs sm>
            <Typography
              variant="title5"
              weight="700"
              color="shade9"
              style={{ fontFamily: 'Media Sans' }}
            >
              My Market Requests
            </Typography>
          </Hidden>
          <Visible xs sm>
            <Typography
              variant="title5"
              weight="700"
              color="shade9"
              style={{ fontFamily: 'Media Sans' }}
            >
              Market Requests
            </Typography>
          </Visible>
        </Col>
        <Col xs="content">
          <Visible sm md lg xl xxl>
            <Button
              onClick={() => history.push(BUYER_ROUTES.CREATE_MARKET_REQUEST)}
              text="CREATE REQUEST"
              variant={props.isPendingAccount ? 'disabled' : 'primary'}
              size="md"
              disabled={props.isPendingAccount}
            />
          </Visible>
        </Col>
      </Row>
      {renderMobile()}
      {renderNonMobile()}
      <MobileFooter>
        <Button
          onClick={() => history.push(BUYER_ROUTES.CREATE_MARKET_REQUEST)}
          text="CREATE REQUEST"
          variant={props.isPendingAccount ? 'disabled' : 'primary'}
          takeFullWidth
          disabled={props.isPendingAccount}
          icon={
            <ChevronRight
              width={15}
              height={12}
              fill="white"
              style={{ paddingBottom: '2px' }}
            />
          }
        />
      </MobileFooter>
    </MarketRequestsContainer>
  );
};

function buildSize(
  metric: string,
  sizeFrom: string | undefined,
  sizeTo: string | undefined
) {
  const _buildSize = sizeToString(
    metric,
    sizeFrom?.toString(),
    sizeTo?.toString()
  );

  return _buildSize;
}

export default MarketRequestsLandingView;
