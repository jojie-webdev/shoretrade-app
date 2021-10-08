import React, { Dispatch, SetStateAction } from 'react';

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
import OfferAlert from 'components/module/OfferAlert';
import TermsAndCondition from 'components/module/TermsAndCondition';
import { BUYER_ROUTES } from 'consts';
import { BUYER_MARKET_REQUEST_ROUTES } from 'consts/routes';
import { Row, Col, Visible, Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import {
  GetActiveOffersRequestResponseItem,
  Offer,
  OfferStatus,
} from 'types/store/GetActiveOffersState';
import useLocalStorage from 'utils/Hooks/useLocalStorage';
import { sizeToString } from 'utils/Listing';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { getOfferStatus, hasOfferWithPaymentRequired } from 'utils/MarketRequest/offerStatus';
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
  setHasPaymentRequired: Dispatch<SetStateAction<boolean>>;
  offers: Offer[];
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
    expiry,
    offers,
    type,
    image,
    measurementUnit,
    weight,
    specs,
    size,
    setItemToDelete,
    metric,
    setHasPaymentRequired,
  } = props;

  const isMobile = useMediaQuery({ query: '(max-width: 974px)' });

  if (hasOfferWithPaymentRequired(offers)) {
    setHasPaymentRequired(true);
  }

  return (
    <MarketRequestItemContainer>
      <div className="thumbnail-container">
        <img src={parseImageUrl(image)} />
      </div>
      <div className="info-container">
        <Col style={{ padding: '0 5px' }}>
          <div className="sub-group">
            <TypographyView variant="label">{type}</TypographyView>
            <SubText variant="caption">{specs?.split(',').join(', ')}</SubText>
          </div>
        </Col>

        <Col style={{ padding: '0 5px' }}>
          <div className="sub-group">
            {buildSize(
              metric,
              size?.from?.toString(),
              size?.to?.toString(),
              size?.options
            ) && (
              <SubText variant="caption">{`Size: ${buildSize(
                metric,
                size?.from?.toString(),
                size?.to?.toString(),
                size?.options
              )}`}</SubText>
            )}
            <SubText variant="caption">
              {weight &&
                `Qty: ${weight.from} ${formatUnitToPricePerUnit(
                  measurementUnit?.toLocaleLowerCase()
                )} ~ ${weight.to} ${formatUnitToPricePerUnit(
                  measurementUnit?.toLocaleLowerCase()
                )}`}
            </SubText>
          </div>
        </Col>

        <Col sm={2} style={{ padding: '0 5px' }}>
          <div className="sub-group">
            <SubText
              variant="caption"
              color={expiry === 'Expired' ? 'error' : 'primary'}
            >
              {expiry === 'Expired' ? expiry : `${expiry} left`}
            </SubText>
          </div>
        </Col>

        <Col style={{ padding: '0 5px' }}>
          <BadgesContainer>
            {renderInOrderBadge(offers, isMobile)}
          </BadgesContainer>
        </Col>

        <Col sm={1} style={{ padding: '0 5px' }}>
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
        </Col>
      </div>
    </MarketRequestItemContainer>
  );
};

export const MarketRequestItemMobile = (props: {
  expiry: string;
  offers: Offer[];
  type: string;
  image: string;
  inDetail: boolean;
  metric: string;
  paymentRequired: boolean;
  weight?: { from: number; to: number };
  measurementUnit?: string;
  setHasPaymentRequired: Dispatch<SetStateAction<boolean>>;
  specs?: string;
  size?: { from: number; to: number; options: any; ungraded: boolean };
  offerStatus?: string;
}) => {
  const {
    expiry,
    offers,
    type,
    image,
    measurementUnit,
    weight,
    specs,
    size,
    metric,
    setHasPaymentRequired,
  } = props;

  if (hasOfferWithPaymentRequired(offers)) {
    setHasPaymentRequired(true);
  }

  const isMobile = useMediaQuery({ query: '(max-width: 974px)' });

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
                Case.pascal(formatUnitToPricePerUnit(measurementUnit || ''))
            )}
          </SubMinorDetail>

          <SubMinorDetail>{subMinorDetail('Time Left', expiry)}</SubMinorDetail>

          <SubMinorDetail>
            {subMinorDetail(
              'Size',
              buildSize(
                metric,
                size?.from?.toString(),
                size?.to?.toString(),
                size?.options
              ) || 'None'
            )}
          </SubMinorDetail>
        </SubMinorInfo>

        <Badges>{renderInOrderBadge(offers, isMobile, true)}</Badges>
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
    activeOffersData,
    hasPaymentRequired,
    setHasPaymentRequired,
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
            type={mr.offers?.length > 0 ? 'next' : 'none'}
            onClick={() => onClickItem(mr)}
            leftComponent={
              <MarketRequestItemMobile
                setHasPaymentRequired={setHasPaymentRequired}
                inDetail={false}
                {...mr}
              />
            }
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
            type={mr.offers?.length > 0 ? 'next' : 'none'}
            onClick={() => onClickItem(mr)}
            leftComponent={
              <MarketRequestItemNonMobile
                setHasPaymentRequired={setHasPaymentRequired}
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
          'Search for the product you want to request  and detail the specifications, size, and quantity you require. Your Market Request will be displayed to all of the Sellers on ShoreTrade, who can then make you a direct offer.'
        }
        cardText2={
          'Negotiate and Accept Offers from Sellers for up to 7 days or until the maximum quantity requested has been reached.'
        }
        cardText3={
          'Process the payment for accepted offers and get real time delivery updates.'
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
              onClick={() =>
                history.push(BUYER_MARKET_REQUEST_ROUTES.CREATE_MARKET_REQUEST)
              }
              text="CREATE REQUEST"
              variant={props.isPendingAccount ? 'disabled' : 'primary'}
              size="md"
              disabled={props.isPendingAccount}
            />
          </Visible>
        </Col>
      </Row>
      <Row>
        <Col>
          {hasPaymentRequired && (
            <OfferAlert status={OfferStatus.PAYMENT_REQUIRED} />
          )}
        </Col>
      </Row>
      {renderMobile()}
      {renderNonMobile()}
      <MobileFooter>
        <Button
          onClick={() =>
            history.push(BUYER_MARKET_REQUEST_ROUTES.CREATE_MARKET_REQUEST)
          }
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
  sizeTo: string | undefined,
  options: any
) {
  let buildSize = sizeToString(
    metric,
    sizeFrom?.toString(),
    sizeTo?.toString()
  );

  const getCorrectedSize = () => {
    if (options && Array.isArray(options) && options.length > 1) {
      return 'Various';
    }

    return buildSize;
  };

  if (!sizeFrom) {
    if (options && Array.isArray(options)) {
      buildSize = options.join(',');
    }

    buildSize = getCorrectedSize();
  } else {
    buildSize = buildSize.replace('-', 'to');
    buildSize = getCorrectedSize();
  }

  return buildSize;
}

const roundBadge = (children: JSX.Element, badgeColor = '#FFF7F2') => (
  <Badge
    className="offers-badge"
    badgeColor={badgeColor}
    padding="8px 8px"
    borderRadius="8px"
  >
    {children}
  </Badge>
);

const offersCountTextBadge = (offers: Offer[]) => (
  <BadgeText variant="overline" empty={offers?.length === 0}>
    {`${offers?.length > 0 ? offers?.length : 'No'} ${
      offers?.length === 1 ? 'Offer' : 'Offers'
    }`}
  </BadgeText>
);

const offerNumberBadge = (offers: Offer[]) => {
  return roundBadge(offersCountTextBadge(offers), theme.grey.shade3);
};

const hasOfferThatIsNew = (offers: Offer[]) => {
  if (!offers || offers.length < 1) {
    return;
  }

  const offer = offers.find(
    (offer) => getOfferStatus(offer, 'buyer') === 'NEW OFFER'
  );

  return offer;
};

const hasOfferWithNegotiation = (offers: Offer[]) => {
  if (!offers) {
    return;
  }

  const offer = offers.find(
    (offer) => getOfferStatus(offer, 'buyer') === 'NEGOTIATION'
  );

  return offer;
};

const paymentRequiredTextBadgeForSmallerDesktopScreens = (
  <>
    <BadgeText variant="overline" style={{ color: theme.brand.warning }}>
      PAYMENT
    </BadgeText>
    <BadgeText variant="overline" style={{ color: theme.brand.warning }}>
      REQUIRED
    </BadgeText>
  </>
);

const renderInOrderBadge = (
  offers: Offer[],
  isSmallDesktopScreen: boolean,
  isMobile = false
) => {
  const badgeText = (fontColor: string, text: string) => (
    <BadgeText variant="overline" style={{ color: fontColor }}>
      {text}
    </BadgeText>
  );

  if (hasOfferThatIsNew(offers)) {
    const newBadgeText = badgeText(theme.brand.success, 'New Offer');

    return roundBadge(newBadgeText, '#EAFFF9');
  }

  if (hasOfferWithNegotiation(offers)) {
    const newBadgeText = badgeText(theme.brand.alert, 'Negotiation');

    return roundBadge(newBadgeText, '#FFFBF2');
  }

  if (hasOfferWithPaymentRequired(offers)) {
    const newBadgeText = badgeText(theme.brand.warning, 'Payment Required');
    if (!isMobile) {
      const correctNewBadgeText = !isSmallDesktopScreen
        ? newBadgeText
        : paymentRequiredTextBadgeForSmallerDesktopScreens;

      return roundBadge(correctNewBadgeText, '#FFF7F2');
    } else {
      return roundBadge(newBadgeText, '#FFF7F2');
    }
  }

  return offerNumberBadge(offers);
};

export default MarketRequestsLandingView;
