import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import { Close, Check } from 'components/base/SVG';
import Refresh from 'components/base/SVG/Refresh';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import AcceptSellerModal from 'components/module/AcceptSellerModal';
import ConfirmationModal from 'components/module/ConfirmationModal';
import DeclineSellerModal from 'components/module/DeclineSellerModal';
import MobileHeader from 'components/module/MobileHeader';
import NegotiateSellerModal from 'components/module/NegotiateSellerModal';
// import PaymentTimeLeft from 'components/module/PaymentTimeLeft';
import NegotiationSellerModal from 'components/module/NegotiationSellerModal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { SELLER_MARKET_BOARD_ROUTES, SELLER_ROUTES } from 'consts/routes';
import moment from 'moment';
import { groupBy, isEmpty, pathOr, sortBy } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory, useLocation } from 'react-router-dom';
import { OfferStatus } from 'types/store/GetActiveOffersState';
import { Specification } from 'types/store/GetAllMarketRequestState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';
import { GetListingBoxesResponseItem } from 'types/store/GetListingBoxesState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { transformMarketRequestStatusText } from 'utils/MarketRequest/marketRequestTag';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { TABS } from '../Landing/Landing.constants';
import { getShippingAddress } from '../Landing/Landing.transform';
import MakeOffer from './MakeOffer';
import { MakeOfferProps } from './MakeOffer/MakeOffer.props';
import {
  RequestAndNegotiateGeneratedProps,
  Step1Props,
} from './RequestAndNegotiate.props';
import {
  SummaryContentContainer,
  Container,
  BadgesContainer,
  BadgeText,
  // MetricContainer,
  StyledBadge,
  Contents,
  Tag,
  Line,
  CalculationContainer,
  NegoCTAContainer,
  DeclineBtnWrapper,
  NegoBtnWrapper,
  LeftBtnsContainer,
  AcceptBtnWrapper,
} from './RequestAndNegotiate.style';
import ReviewOffer from './ReviewOffer';
import { ReviewOfferProps } from './ReviewOffer/ReviewOffer.props';

const Step1 = ({
  isReview,
  buyerRequest,
  activeOffer,
  userPending,
  buyerRequestForActiveOfferTab,
  negotiation,
  ...props
}: Step1Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();

  const unit = formatMeasurementUnit(
    isReview ? buyerRequest.measurementUnit : activeOffer.measurementUnit
  );

  const metric = isReview ? buyerRequest.metric : '';

  const noNegotiations = isReview ? true : isEmpty(activeOffer.negotiations);
  const isNegoOpen = isReview
    ? false
    : activeOffer.status === OfferStatus.NEGOTIATION;

  const getSizeBadge = () => {
    if (buyerRequest && buyerRequest.sizeUngraded) {
      return ['Ungraded'];
    }

    if (buyerRequest && !isEmpty(buyerRequest.sizeOptions)) {
      return buyerRequest.sizeOptions;
    }

    const sizeFrom = pathOr(null, ['size', 'from'], activeOffer);
    if (activeOffer) {
      if (sizeFrom === null) {
        return ['Ungraded'];
      } else if (isNaN(parseFloat(sizeFrom))) {
        return [activeOffer.size?.from || ''];
      }
    }

    return [];
  };

  const groupSpecs = groupBy((a: Specification) => `group${a.stateGroup}`)(
    buyerRequest?.specifications || []
  );
  const offerGroupSpecs = groupBy((a: string) => `group${a}`)(
    activeOffer?.specifications || []
  );

  const SummaryBadges = (badgeProps: { items: string[]; label: string }) => {
    const { items, label } = badgeProps;

    if (isEmpty(items)) return <></>;

    const tagsMarkup = items.map((item) => (
      <Badge key={item} className="badge" badgeColor={theme.grey.shade3}>
        <BadgeText color="shade9" variant="overline">
          {item}
        </BadgeText>
      </Badge>
    ));

    return (
      <div>
        <Typography
          style={{ margin: '24px 0 12px 0' }}
          color="shade6"
          variant="overline"
        >
          {label}
        </Typography>
        <BadgesContainer>{tagsMarkup}</BadgesContainer>
      </div>
    );
  };

  const Negotiations = ({
    activeOffer,
  }: {
    activeOffer: Step1Props['activeOffer'];
  }) => {
    if (isReview) return <></>;
    if (noNegotiations || !isNegoOpen) {
      return (
        <div className="offer-container">
          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Your Offer
            </Typography>
            <Typography variant="label" weight="bold" color="noshade">
              {toPrice(activeOffer.price)}/{unit}
            </Typography>
          </div>

          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Total Value
            </Typography>
            <Typography variant="label" weight="bold" color="noshade">
              {toPrice(activeOffer.price * activeOffer.weight)}
            </Typography>
          </div>
        </div>
      );
    }

    const sortByDate = sortBy(
      (data: { created_at: string }) => data.created_at
    );
    const negotiations = sortByDate(activeOffer.negotiations);
    const acceptedOffer = negotiations.find((a) => a.is_accepted);
    const sellerNegos = negotiations.filter((n) => n.type === 'NEW_OFFER');
    const buyerNegos = negotiations.filter((n) => n.type === 'COUNTER_OFFER');

    const latestSellerNego = sellerNegos.slice(-1)[0];
    const latestBuyerNego = buyerNegos.slice(-1)[0];

    const currentOfferPrice =
      acceptedOffer?.price ||
      latestSellerNego?.price ||
      activeOffer.originalOfferPrice;

    // buyerNegos is always greater or equal sellerNegos
    // if buyerNegos is greater than sellerNegos, updatedPrice is latestBuyerNego
    const updatedPrice =
      buyerNegos.length > sellerNegos.length
        ? latestBuyerNego?.price || 0 // 0 should never happen
        : currentOfferPrice;

    // if buyerNegos is greater than sellerNegos, initialPrice is currentOfferPrice
    // initially buyerNegos is 0 so we fallback to currentOfferPrice
    const initialPrice =
      buyerNegos.length > sellerNegos.length
        ? currentOfferPrice
        : latestBuyerNego?.price || currentOfferPrice;

    // standard change in price formula
    const discountValue = updatedPrice - initialPrice;
    const discountPercentage = ((discountValue / initialPrice) * 100).toFixed(
      2
    );

    const actualPrice =
      activeOffer.status === 'ACCEPTED'
        ? acceptedOffer?.price || currentOfferPrice
        : activeOffer.statusText === 'Awaiting Buyer'
        ? latestSellerNego.price
        : latestBuyerNego.price;
    const totalValue = actualPrice * activeOffer.weight;

    const latestNewOfferDate = latestSellerNego
      ? moment(latestSellerNego.created_at).toDate()
      : undefined;
    const latestCounterOfferDate = latestBuyerNego
      ? moment(latestBuyerNego.created_at).toDate()
      : undefined;
    const isNegotiationAllowed =
      (latestNewOfferDate &&
        latestCounterOfferDate &&
        latestCounterOfferDate > latestNewOfferDate) ||
      (latestBuyerNego && !latestNewOfferDate);

    const lastNegotiationsArray = negotiations.slice(
      Math.max(negotiations.length - (negotiations.length >= 2 ? 2 : 1), 0)
    );

    const modalLastNegotiationsArray = negotiations.slice(
      Math.max(negotiations.length - (negotiations.length >= 2 ? 2 : 1), 0)
    );

    // eslint-disable-next-line
    sellerNegos.map((off, index) => {
      const find = lastNegotiationsArray.find((ltn) => off.id === ltn.id);
      const findModal = modalLastNegotiationsArray.find(
        (ltn) => off.id === ltn.id
      );
      if (find !== undefined) {
        if (index === 0) {
          find.ordinal = index + 2;
        } else {
          find.ordinal = index + 1;
        }
      }
      if (findModal !== undefined) {
        if (index === 0) {
          findModal.ordinal = index + 2;
        } else {
          findModal.ordinal = index + 1;
        }
      }
    });

    // eslint-disable-next-line
    buyerNegos.map((off, index) => {
      const find = lastNegotiationsArray.find((ltn) => off.id === ltn.id);
      const findModal = modalLastNegotiationsArray.find(
        (ltn) => off.id === ltn.id
      );

      if (find !== undefined) {
        find.ordinal = index + 1;
      }
      if (findModal !== undefined) {
        findModal.ordinal = index + 1;
      }
    });

    const showButtons =
      !isReview && !noNegotiations && isNegoOpen && isNegotiationAllowed;

    return (
      <>
        <div className="offer-container">
          {negotiations.length <= 1 && (
            <div className="computation-item-container">
              <Typography variant="label" color="noshade">
                Your Offer
              </Typography>
              <Typography variant="label" weight="bold" color="noshade">
                {toPrice(activeOffer.originalOfferPrice)}/{unit}
              </Typography>
            </div>
          )}

          {negotiations.length !== 0 && negotiations.length <= 1 && (
            <>
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Buyer&apos;s Counter Offer
                </Typography>
                <Typography variant="label" color="noshade" weight="bold">
                  {toPrice(latestBuyerNego.price)}/{unit}
                </Typography>
              </div>
            </>
          )}

          {negotiations.length >= 2 &&
            lastNegotiationsArray.map((offer) => {
              return (
                <div key={offer.id} className="computation-item-container">
                  <Typography variant="label" color="noshade">
                    {`${
                      offer.type === 'COUNTER_OFFER'
                        ? `Buyer's ${
                            lastNegotiationsArray[
                              lastNegotiationsArray.length - 1
                            ].type === 'COUNTER_OFFER'
                              ? 'Counter'
                              : 'Previous'
                          }`
                        : 'Your'
                    } Offer `}
                  </Typography>
                  <Typography variant="label" color="noshade" weight="bold">
                    {toPrice(offer.price)}/{unit}
                  </Typography>
                </div>
              );
            })}

          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Change in Price{' '}
              <span className="indicator">{`${
                discountValue > 0 ? '+' : ''
              }${discountPercentage}%`}</span>
            </Typography>
            {discountValue !== 0 ? (
              <Typography
                color={discountValue >= 0 ? 'success' : 'error'}
                variant="label"
                weight="bold"
              >
                {toPrice(Math.abs(discountValue))}/{unit}
              </Typography>
            ) : (
              <Typography variant="label" weight="bold" color="noshade">
                0
              </Typography>
            )}
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Total Value
            </Typography>
            <Typography variant="label" color="noshade" weight="bold">
              {toPrice(totalValue)}
            </Typography>
          </div>
        </div>

        {showButtons && !isMobile && (
          <div className={'submit-btns1'}>
            <Button
              onClick={() => setIsOpen(true)}
              className={'submit-btn'}
              text="Negotiate"
              variant="outline"
            />
            <Button
              loading={props.isNegotiating}
              onClick={() =>
                props.onNegotiateOffer(
                  activeOffer.id,
                  latestBuyerNego.price,
                  true
                )
              }
              className={'submit-btn'}
              text="accept"
              variant="primary"
            />
          </div>
        )}

        {showButtons && isMobile && (
          <MobileFooter>
            <Button
              onClick={() => setIsOpen(true)}
              takeFullWidth
              text="Negotiate"
              variant="outline"
            />
            <Button
              loading={props.isNegotiating}
              onClick={() =>
                props.onNegotiateOffer(
                  activeOffer.id,
                  latestBuyerNego.price,
                  true
                )
              }
              takeFullWidth
              style={{ marginLeft: 8 }}
              text="accept"
              variant="primary"
            />
          </MobileFooter>
        )}

        {/* {showButtons && !isMobile && (
          <div className={'submit-btns'}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                // onClick={handleDeclineBtnClick}
                onClick={() => console.log('')}
                text={
                  <Typography color="primary" style={{ marginRight: 5 }}>
                    Decline
                  </Typography>
                }
                variant="outline"
                icon={<Close fill={theme.brand.primary} />}
              />
              <div style={{ marginLeft: 8 }} />
              <Button
                text={
                  <Typography color="noshade" style={{ marginRight: 5 }}>
                    Negotiate
                  </Typography>
                }
                onClick={() => setIsOpen(true)}
                icon={<Refresh fill={theme.grey.noshade} />}
              />
            </div>
            <div style={{ marginLeft: 8 }} />
            <Button
              text={
                <Typography color="noshade" style={{ marginRight: 5 }}>
                  Accept
                </Typography>
              }
              // onClick={handleAcceptBtnClick}
              onClick={() => console.log('')}
              variant="primary"
              icon={<Check width={10} height={9} />}
            />
          </div>
        )} */}

        {/* {showButtons && isMobile && (
          <MobileFooter>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  // onClick={handleDeclineBtnClick}
                  onClick={() => console.log('')}
                  text={
                    <Typography color="primary" style={{ marginRight: 5 }}>
                      Decline
                    </Typography>
                  }
                  variant="outline"
                  icon={<Close fill={theme.brand.primary} />}
                  takeFullWidth
                />
                <div style={{ marginRight: 10 }} />
                <Button
                  text={
                    <Typography color="noshade" style={{ marginRight: 5 }}>
                      Accept
                    </Typography>
                  }
                  // onClick={handleAcceptBtnClick}
                  onClick={() => console.log('')}
                  variant="primary"
                  icon={<Check width={10} height={9} />}
                  takeFullWidth
                />
              </div>
              <div style={{ marginTop: 10 }} />
              <div>
                <Button
                  text={
                    <Typography color="noshade" style={{ marginRight: 5 }}>
                      Negotiate
                    </Typography>
                  }
                  onClick={() => setIsOpen(true)}
                  icon={<Refresh fill={theme.grey.noshade} />}
                  takeFullWidth
                />
              </div>
            </div>
          </MobileFooter>
        )} */}

        <AcceptSellerModal
          // show={showAcceptModal}
          // onCloseClick={handleAcceptBtnClick}
          show={false}
          onCloseClick={() => console.log('')}
          isAccepting={props.isNegotiating}
          onAcceptBtnClick={() => {
            // handleAcceptBtnClick();
            props.onNegotiateOffer(activeOffer.id, latestBuyerNego.price, true);
          }}
          quantity={
            (isReview
              ? buyerRequest.weight?.from || 0
              : activeOffer.weight || 0) + ` ${unit}`
          }
          buyersNegoPrice={`${toPrice(latestBuyerNego.price)}/${unit}`}
          percentageChangeInPrice={`${
            discountValue > 0 ? '+' : ''
          }${discountPercentage}%`}
          isGoodNego={discountValue >= 0}
          negoDiff={`${toPrice(Math.abs(discountValue))}/${unit}`}
          totalValue={toPrice(activeOffer.price * activeOffer.weight)}
          listingBoxes={{} as GetListingBoxesResponseItem}
          negoMeasurementUnit=""
        />

        <NegotiateSellerModal
          marketOffer={activeOffer}
          modalLastNegotiationsArray={modalLastNegotiationsArray}
          isOpen={isOpen}
          onClickClose={() => setIsOpen(false)}
          isNegotiating={props.isNegotiating}
          onSubmit={(counterOffer) => {
            props.onNegotiateOffer(activeOffer.id, counterOffer);
            setIsOpen(false);
          }}
        />

        {/* <NegotiationSellerModal
          marketOffer={activeOffer}
          modalLastNegotiationsArray={modalLastNegotiationsArray}
          isOpen={false}
          onClickClose={() => setIsOpen(false)}
          isNegotiating={props.isNegotiating}
          onSubmit={(counterOffer) => {
            props.onNegotiateOffer(activeOffer.id, counterOffer);
            setIsOpen(false);
          }}
        /> */}

        {/* <DeclineSellerModal
          // show={showDeclineModal}
          // onCancelBtnClick={handleCancelBtnClick}
          // onConfirmBtnClick={handleConfirmBtnClick}
          show={false}
          onCancelBtnClick={() => console.log('')}
          onConfirmBtnClick={() => console.log('')}
        /> */}
      </>
    );
  };

  const getAddressFromBuyerRequest = () => {
    const { shippingTo } = buyerRequest;
    const { suburb, state, postcode } = shippingTo;
    const address = `${suburb}, ${state} ${postcode}`;

    return address;
  };

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const statusTextProps = transformMarketRequestStatusText(
    theme,
    activeOffer?.statusText || '',
    true,
    [`${activeOffer?.orderRefNumber}`]
  );

  const isMyActiveOffersTab = () => {
    const isNotBuyersRequestTab = !location.pathname.includes('/offer');
    return isNotBuyersRequestTab;
  };

  const isGoodToDisplayAlert = () => {
    const isGoodToDisplayAlert =
      isMyActiveOffersTab() && statusTextProps.text !== '';
    return isGoodToDisplayAlert;
  };

  const AlertContent = (props: { text: string; description: string }) => {
    if (props.text === 'Finalised') {
      return (
        <span
          onClick={() => history.replace(SELLER_ROUTES.SOLD)}
          style={{ cursor: 'pointer' }}
        >
          <Typography
            component={'span'}
            variant="body"
            color="shade6"
            weight="400"
          >
            {props.description}
          </Typography>
        </span>
      );
    }
    // if (props.text === 'Payment Required') {
    //   return (
    //     <>
    //       {props.description}
    //       <PaymentTimeLeft timeLeft={selectedOffer.expiryDate} />
    //     </>
    //   );
    // }
    return <>{props.description}</>;
  };
  return (
    <>
      {isGoodToDisplayAlert() && (
        <>
          <Alert
            content={
              <AlertContent
                text={statusTextProps.text}
                description={statusTextProps.description}
              />
            }
            header={statusTextProps.alertTitle}
            variant={statusTextProps.variantColor || 'info'}
            color={statusTextProps.tagColor}
            fullWidth
          />
          <div style={{ marginBottom: '16px' }} />
        </>
      )}

      <div style={{ marginBottom: '16px' }} />

      <SummaryContentContainer>
        {isReview && (
          <Typography color="noshade" altFont>
            The buyer has requested the following items to be shipped to{' '}
            {getAddressFromBuyerRequest()}.
          </Typography>
        )}
        {isReview &&
          Object.keys(groupSpecs).map((group, index) => {
            return (
              <>
                <SummaryBadges
                  label={`Specs ${index + 1}`}
                  items={
                    buyerRequest.specifications
                      ? groupSpecs[group].map((spec, i, arr) => spec.stateName)
                      : []
                  }
                />
              </>
            );
          })}
        {!isReview &&
          Object.keys(offerGroupSpecs).map((group, index) => {
            return (
              <>
                <SummaryBadges
                  label={`Specs ${index + 1}`}
                  items={
                    activeOffer.specifications
                      ? offerGroupSpecs[group].map((spec, i, arr) => spec)
                      : []
                  }
                />
              </>
            );
          })}
        {!isEmpty(getSizeBadge()) ? (
          <SummaryBadges label="Sizes" items={getSizeBadge()} />
        ) : (
          <>
            <Typography
              style={{ margin: '24px 0 12px 0' }}
              color="shade6"
              variant="overline"
            >
              Size
            </Typography>
            {/* {metric !== '' && (
              <MetricContainer>
                <Typography color="shade6" variant="overline">
                  Metric:
                </Typography>
                <Typography
                  style={{ marginLeft: '8px' }}
                  color="shade2"
                  variant="overline"
                >
                  {metric}
                </Typography>
              </MetricContainer>
            )} */}

            <div className="quantity-container">
              <StyledBadge badgeColor={theme.grey.shade3}>
                <BadgeText color="shade9" variant="overline">
                  {/* {isReview
                    ? buyerRequest.sizeFrom || 0
                    : activeOffer.size.from || 0} */}
                  {isReview
                    ? sizeToString(
                        metric,
                        buyerRequest.sizeFrom,
                        buyerRequest.sizeTo,
                        buyerRequest.sizeOptions
                      )
                    : sizeToString(
                        activeOffer.metric,
                        activeOffer.size.from,
                        activeOffer.size.to
                      )}
                </BadgeText>
              </StyledBadge>
            </div>
          </>
        )}

        <Typography
          style={{ margin: '24px 0 12px 0' }}
          color="shade6"
          variant="overline"
        >
          Quantity
        </Typography>
        <div className="quantity-container">
          <StyledBadge badgeColor={theme.grey.shade3}>
            <BadgeText color="shade9" variant="overline">
              {isReview
                ? buyerRequest.weight?.from || 0
                : activeOffer.weight || 0}
              {` ${unit}`}
            </BadgeText>
          </StyledBadge>

          {isReview && (
            <>
              <Typography
                variant="label"
                color="noshade"
                weight="bold"
                className="dash"
              >
                -
              </Typography>
              <StyledBadge badgeColor={theme.grey.shade3}>
                <BadgeText color="shade9" variant="overline">
                  {buyerRequest.weight?.to || 0}
                  {` ${unit}`}
                </BadgeText>
              </StyledBadge>
            </>
          )}
        </div>

        <Typography
          style={{ margin: '24px 0 12px 0' }}
          color="shade6"
          variant="overline"
        >
          Shipping to
        </Typography>
        <div className="quantity-container">
          <StyledBadge badgeColor={theme.grey.shade3}>
            <BadgeText color="shade9" variant="overline">
              {isReview
                ? getAddressFromBuyerRequest()
                : getShippingAddress(activeOffer.shippingTo)}
            </BadgeText>
          </StyledBadge>
        </div>

        {/* TODO DELIVERY DATE */}
        {!isReview && (
          <>
            <Typography
              style={{ margin: '24px 0 12px 0' }}
              color="shade6"
              variant="overline"
            >
              Delivery Date
            </Typography>
            <div className="quantity-container">
              <StyledBadge badgeColor={theme.grey.shade3}>
                <BadgeText color="shade9" variant="overline">
                  {moment(activeOffer.deliveryDate).format('MMM. DD, YYYY')}
                </BadgeText>
              </StyledBadge>
            </div>
          </>
        )}

        <Negotiations activeOffer={activeOffer} />

        {isReview && !isMobile && (
          <Button
            onClick={() => props.setStep && props.setStep(2)}
            className="submit-btn"
            disabled={userPending}
            text="Make an offer"
            variant={userPending ? 'disabled' : 'primary'}
          />
        )}
      </SummaryContentContainer>
    </>
  );
};

const Step2 = (props: MakeOfferProps) => {
  return <MakeOffer {...props} />;
};

const Step3 = (props: ReviewOfferProps) => {
  return <ReviewOffer {...props} />;
};

const Negotiation = (props: {
  negotiation: GetAllNegoRequestResponseItem & {
    expiry: any;
  };
}) => {
  const { negotiation } = props;
  const history = useHistory();
  const theme = useTheme();

  const statusTextProps = transformMarketRequestStatusText(
    theme,
    negotiation.display_status || '',
    true,
    [`${negotiation.listing_id}`]
  );

  const AlertContent = (props: { text: string; description: string }) => {
    if (props.text === 'Finalised') {
      return (
        <span
          onClick={() => history.replace(SELLER_ROUTES.SOLD)}
          style={{ cursor: 'pointer' }}
        >
          <Typography
            component={'span'}
            variant="body"
            color="shade6"
            weight="400"
          >
            {props.description}
          </Typography>
        </span>
      );
    }
    return <>{props.description}</>;
  };

  return (
    <>
      <Typography
        color="shade6"
        weight="700"
        style={{ fontFamily: 'Basis Grotesque Pro', letterSpacing: 1 }}
      >
        The customer has detailed the specifications they want for this
        negotiation
      </Typography>

      <div style={{ marginTop: 24 }} />

      <Alert
        content={
          <AlertContent
            text={statusTextProps.text}
            description={statusTextProps.description}
          />
        }
        header={statusTextProps.alertTitle}
        variant={statusTextProps.variantColor || 'info'}
        color={statusTextProps.tagColor}
        fullWidth
      />

      <Contents>
        <Typography
          color="shade6"
          weight="700"
          style={{ fontFamily: 'Basis Grotesque Pro', letterSpacing: 2 }}
        >
          SPECIFICATION
        </Typography>
        <div style={{ marginTop: 8 }} />
        <div style={{ display: 'flex' }}>
          {negotiation.specifications.map((spec) => (
            <Tag key={spec.id}>
              <Typography
                color="shade9"
                weight="700"
                style={{ fontFamily: 'Basis Grotesque Pro' }}
              >
                {spec.name}
              </Typography>
            </Tag>
          ))}
        </div>

        <div style={{ marginTop: 24 }} />
        <Typography
          color="shade6"
          weight="700"
          style={{ fontFamily: 'Basis Grotesque Pro', letterSpacing: 2 }}
        >
          SIZE
        </Typography>
        <div style={{ marginTop: 8 }} />
        <Tag>
          <Typography
            color="shade9"
            weight="700"
            style={{ fontFamily: 'Basis Grotesque Pro' }}
          >
            {sizeToString(
              'Grams', //negotiation.metric
              negotiation.size_from,
              negotiation.size_to
            )}
          </Typography>
        </Tag>

        <div style={{ marginTop: 24 }} />
        <Typography
          color="shade6"
          weight="700"
          style={{ fontFamily: 'Basis Grotesque Pro', letterSpacing: 2 }}
        >
          QUANTITY
        </Typography>
        <div style={{ marginTop: 8 }} />
        <Tag>
          <Typography
            color="shade9"
            weight="700"
            style={{ fontFamily: 'Basis Grotesque Pro' }}
          >
            {negotiation.desired_quantity} {negotiation.measurement_unit}
          </Typography>
        </Tag>

        <div style={{ marginTop: 24 }} />
        <Line />

        <CalculationContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color="noshade"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              Your Offer
            </Typography>
            <Typography
              color="noshade"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              $??.??/unit
              {/* ${negotiation.desired_quantity}/
              {negotiation.measurement_unit.toLowerCase()} */}
            </Typography>
          </div>

          <div style={{ marginTop: 12 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color="noshade"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              Buyer&apos;s Counter Offer
            </Typography>
            <Typography
              color="noshade"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              ${negotiation.counter_offer}/
              {negotiation.measurement_unit.toLowerCase()}
            </Typography>
          </div>

          <div style={{ marginTop: 12 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color="noshade"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              Change in Price <span>0.5%</span>
            </Typography>
            <Typography
              color="error"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              -$15/kg
            </Typography>
          </div>

          <div style={{ marginTop: 12 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color="noshade"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              Total Value
            </Typography>
            <Typography
              color="noshade"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              $1800.00
            </Typography>
          </div>
        </CalculationContainer>

        <NegoCTAContainer>
          <LeftBtnsContainer>
            <DeclineBtnWrapper
              text={
                <Typography
                  color="primary"
                  weight="700"
                  style={{
                    fontFamily: 'Basis Grotesque Pro',
                    letterSpacing: 1,
                  }}
                >
                  Decline
                </Typography>
              }
              iconPosition="after"
              icon={
                <div style={{ marginLeft: 5 }}>
                  <Close fill={theme.brand.primary} />
                </div>
              }
              variant="outline"
            />
            <NegoBtnWrapper
              text={
                <Typography
                  color="noshade"
                  weight="700"
                  style={{
                    fontFamily: 'Basis Grotesque Pro',
                    letterSpacing: 1,
                  }}
                >
                  Negotiate
                </Typography>
              }
              iconPosition="after"
              icon={
                <div style={{ marginLeft: 5, marginBottom: 3 }}>
                  <Refresh fill={theme.grey.noshade} />
                </div>
              }
            />
          </LeftBtnsContainer>
          <AcceptBtnWrapper
            text={
              <Typography
                color="noshade"
                weight="700"
                style={{ fontFamily: 'Basis Grotesque Pro', letterSpacing: 1 }}
              >
                Accept
              </Typography>
            }
            iconPosition="after"
            icon={
              <div style={{ marginLeft: 5, marginBottom: 3 }}>
                <Check fill={theme.grey.noshade} />
              </div>
            }
          />
        </NegoCTAContainer>
      </Contents>
    </>
  );
};

const RequestAndNegotiateView = (props: RequestAndNegotiateGeneratedProps) => {
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      {/* <ConfirmationModal
        isOpen={props.showOfferSentModal}
        onClickClose={() => props.onConfirmSentOffer()}
        title="Offer submitted"
        action={() => props.onConfirmSentOffer()}
        actionText="View offers"
        hideCancel={true}
        description={
          <>
            <Typography color="shade6" variant="body">
              The buyer will review your offer.{' '}
            </Typography>
            <Typography color="shade6" variant="body">
              Please ensure you have notifications turned on so that you stay up
              to date on this offer.
            </Typography>
          </>
        }
      /> */}
      <ConfirmationModal
        isOpen={props.showOfferAcceptSentModal}
        onClickClose={() => props.onConfirmSentOffer()}
        title="Offer accepted"
        action={() => props.onConfirmSentOffer()}
        actionText="View offers"
        hideCancel={true}
        description={
          <>
            <Typography color="shade6" variant="body">
              Once payment is finalised an order number will be generated and
              you will be required to confirm the weight and arrange the
              shipping of the product.
            </Typography>
          </>
        }
      />
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            {
              label:
                props.selectedTab === TABS.REVERSE_MARKETPLACE
                  ? 'Buyer Requests'
                  : 'All Negotiations',
              onClick: () => {
                if (!isEmpty(props.offer)) {
                  setIsOpen(true);
                } else if (props.isReview) {
                  history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
                } else {
                  history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING, {
                    currentTab: 'My Active Offers',
                  });
                }
              },
            },
            {
              label:
                props.selectedTab === TABS.REVERSE_MARKETPLACE
                  ? props.isReview
                    ? 'Review Request'
                    : 'Negotiate'
                  : 'Negotiation Details',
              ...(step >= 2 ? { onClick: () => setStep(1) } : {}),
            },
            ...(step === 2 ? [{ label: 'Make an Offer' }] : []),
            ...(step === 3
              ? [
                  { label: 'Make an Offer', onClick: () => setStep(2) },
                  { label: 'Review Offer' },
                ]
              : []),
          ]}
        />
      </div>

      {step !== 3 && (
        <MobileHeader>
          {props.buyerRequest?.type ||
            props.activeOffer?.name ||
            props.negotiation.name ||
            ''}
        </MobileHeader>
      )}

      {props.selectedTab === TABS.REVERSE_MARKETPLACE ? (
        <>
          {step === 1 && (
            <Step1
              setStep={setStep}
              {...props}
              userPending={props.userPending}
            />
          )}
          {step === 2 && <Step2 setStep={setStep} {...props} />}
          {step === 3 && <Step3 setStep={setStep} {...props} />}
        </>
      ) : (
        props.negotiation && <Negotiation negotiation={props.negotiation} />
      )}

      <ConfirmationModal
        isOpen={isOpen}
        title="Clear Current Offer"
        description="Are you sure you want to clear current offer?"
        action={() => {
          props.setOffer([]);
          props.setCurrentOfferItem('');
          setIsOpen(false);
          history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
        }}
        actionText="Clear"
        onClickClose={() => setIsOpen(false)}
      />
      {props.isReview && step === 1 && isMobile && (
        <MobileFooter>
          <Button
            onClick={() => setStep && setStep(2)}
            takeFullWidth
            disabled={props.userPending}
            text="Make an offer"
            variant={props.userPending ? 'disabled' : 'primary'}
            style={{ borderRadius: '12px' }}
          />
        </MobileFooter>
      )}
    </Container>
  );
};

export default RequestAndNegotiateView;
