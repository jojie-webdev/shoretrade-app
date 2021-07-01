import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import { ArrowLeft } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImagePreview from 'components/module/CategoryImagePreview';
import ConfirmationModal from 'components/module/ConfirmationModal';
import NegotiateSellerModal from 'components/module/NegotiateSellerModal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import moment from 'moment';
import { isEmpty, pathOr, sortBy } from 'ramda';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toOrdinalSuffix } from 'utils/String/toOrdinalSuffix';
import { toPrice } from 'utils/String/toPrice';
import theme from 'utils/Theme';

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
  MetricContainer,
  StyledTouchable,
} from './RequestAndNegotiate.style';
import ReviewOffer from './ReviewOffer';
import { ReviewOfferProps } from './ReviewOffer/ReviewOffer.props';

const Step1 = ({
  isReview,
  buyerRequest,
  activeOffer,
  userPending,
  ...props
}: Step1Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const unit = formatMeasurementUnit(
    isReview ? buyerRequest.measurementUnit : activeOffer.measurementUnit
  );

  const metric = isReview ? buyerRequest.metric : '';

  const noNegotiations = isReview ? true : isEmpty(activeOffer.negotiations);
  const isNegoOpen = isReview ? false : activeOffer.status === 'OPEN';

  const getSizeBadge = () => {
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

  const SummaryBadges = (badgeProps: { items: string[]; label: string }) => {
    const { items, label } = badgeProps;

    if (isEmpty(items)) return <></>;

    const tagsMarkup = items.map((item) => (
      <Badge
        key={item}
        className="offers-state-badge"
        badgeColor={theme.grey.shade9}
      >
        <BadgeText color="noshade" weight="bold" variant="overline">
          {item}
        </BadgeText>
      </Badge>
    ));

    return (
      <div>
        <Typography
          style={{ marginBottom: '8px' }}
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

          <div className="computation-item-container border-bottom">
            <Typography variant="label" color="noshade">
              Total Value
            </Typography>
            <Typography variant="label" weight="bold" color="noshade">
              {toPrice(activeOffer.price * activeOffer.weight)}
            </Typography>
          </div>

          {isNegoOpen && (
            <div className="computation-item-container border-bottom">
              <Typography variant="label" color="noshade">
                The buyer is reviewing your offer.
              </Typography>
            </div>
          )}
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
      acceptedOffer?.price || latestSellerNego?.price || activeOffer.price;

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
        : latestBuyerNego?.price || currentOfferPrice;
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

    const isNegotiationEqual =
      latestSellerNego &&
      latestBuyerNego &&
      latestSellerNego.price === latestBuyerNego.price;

    const lastNegotiationsArray = negotiations.slice(
      Math.max(negotiations.length - (negotiations.length >= 2 ? 2 : 1), 0)
    );

    const modalLastNegotiationsArray = negotiations.slice(
      Math.max(negotiations.length - (negotiations.length >= 2 ? 2 : 1), 0)
    );

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
      !isReview &&
      !noNegotiations &&
      isNegoOpen &&
      isNegotiationAllowed &&
      !isNegotiationEqual;

    return (
      <>
        <div className="offer-container">
          {negotiations.length <= 1 && (
            <div className="computation-item-container">
              <Typography variant="label" color="noshade">
                Your Offer
              </Typography>
              <Typography variant="label" weight="bold" color="noshade">
                {toPrice(activeOffer.price)}/{unit}
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
          <div className="computation-item-container border-bottom">
            <Typography variant="label" color="noshade">
              Total Value
            </Typography>
            <Typography variant="label" color="noshade" weight="bold">
              {toPrice(totalValue)}
            </Typography>
          </div>

          {!isNegotiationAllowed && (
            <div className="computation-item-container">
              <Typography variant="label" color="noshade">
                The buyer is reviewing your offer.
              </Typography>
            </div>
          )}
        </div>

        {showButtons && !isMobile && (
          <div className={'submit-btns'}>
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

        <NegotiateSellerModal
          marketOffer={activeOffer}
          modalLastNegotiationsArray={modalLastNegotiationsArray}
          isOpen={isOpen}
          onClickClose={() => setIsOpen(false)}
          isNegotiating={props.isNegotiating}
          onSubmit={(counterOffer) =>
            props.onNegotiateOffer(activeOffer.id, counterOffer)
          }
        />
      </>
    );
  };

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  return (
    <>
      <div className="step-1-container">
        <CategoryImagePreview
          categoryName={isReview ? buyerRequest.type : activeOffer.name}
          imgSrc={isReview ? buyerRequest.image : activeOffer.image}
          marketBoard
        />

        <div className="spacer" />

        <SummaryContentContainer>
          <SummaryBadges
            label="Specs"
            items={
              isReview
                ? buyerRequest.specifications
                  ? buyerRequest.specifications.map((v) => v.stateName)
                  : []
                : activeOffer.specifications
            }
          />
          {!isEmpty(getSizeBadge()) ? (
            <SummaryBadges label="Sizes" items={getSizeBadge()} />
          ) : (
            <>
              <Typography
                style={{ marginBottom: '16px' }}
                color="shade6"
                variant="overline"
              >
                Size
              </Typography>
              {metric !== '' && (
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
              )}

              <div className="quantity-container">
                <TextField
                  className="text-field"
                  type="number"
                  label="From"
                  value={
                    isReview
                      ? buyerRequest.sizeFrom || 0
                      : activeOffer.size.from || 0
                  }
                  LeftComponent={
                    <Typography variant="label" weight="bold" color="shade6">
                      {metric === 'Grams' ? 'g' : unit}
                    </Typography>
                  }
                  disabled
                />

                {isReview && (
                  <TextField
                    className="text-field"
                    type="number"
                    label="To"
                    value={buyerRequest.sizeTo || 0}
                    disabled
                    LeftComponent={
                      <Typography variant="label" weight="bold" color="shade6">
                        {metric === 'Grams' ? 'g' : unit}
                      </Typography>
                    }
                  />
                )}

                {!isReview && parseFloat(activeOffer.size.to || '0') > 0 && (
                  <TextField
                    className="text-field"
                    type="number"
                    label="To"
                    value={activeOffer.size.to}
                    disabled
                    LeftComponent={
                      <Typography variant="label" weight="bold" color="shade6">
                        {unit}
                      </Typography>
                    }
                  />
                )}
              </div>
            </>
          )}
          <Typography
            style={{ margin: isMobile ? '8px 0' : '16px 0' }}
            color="shade6"
            variant="overline"
          >
            Weight
          </Typography>
          <div className="quantity-container">
            <TextField
              className="text-field"
              type="number"
              label={isReview ? 'From' : ''}
              value={
                isReview
                  ? buyerRequest.weight?.from || 0
                  : activeOffer.weight || 0
              }
              disabled
              LeftComponent={
                <Typography variant="label" weight="bold" color="shade6">
                  {unit}
                </Typography>
              }
            />

            {isReview && (
              <TextField
                className="text-field"
                type="number"
                label="To"
                value={buyerRequest.weight?.to || 0}
                disabled
                LeftComponent={
                  <Typography variant="label" weight="bold" color="shade6">
                    {unit}
                  </Typography>
                }
              />
            )}
          </div>

          {isReview && (
            <div className="shipping-to">
              <Typography variant="label" color="shade6">
                Shipping to
              </Typography>
              <Typography variant="label" color="noshade" weight="bold">
                {`${buyerRequest.shippingTo.suburb}, ${buyerRequest.shippingTo.state} ${buyerRequest.shippingTo.postcode}`}
              </Typography>
            </div>
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
      </div>
    </>
  );
};

const Step2 = (props: MakeOfferProps) => {
  return <MakeOffer {...props} />;
};

const Step3 = (props: ReviewOfferProps) => {
  return <ReviewOffer {...props} />;
};

const RequestAndNegotiateView = (props: RequestAndNegotiateGeneratedProps) => {
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const handleNavigation = () => {
    if (step === 1) {
      history.goBack();
    }
    if (step === 2) {
      setStep(1);
    }
    if (step === 3) {
      setStep(2);
    }
  };
  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            {
              label: 'Buyer Requests',
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
              label: props.isReview ? 'Review Request' : 'Negotiate',
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

      {isMobile && (
        <div className="mobile-header">
          <Typography variant="title5" color="noshade" className="product-name">
            {props.buyerRequest?.type || props.activeOffer?.name || ''}
          </Typography>
        </div>
      )}

      {step === 1 && (
        <Step1 setStep={setStep} {...props} userPending={props.userPending} />
      )}
      {step === 2 && <Step2 setStep={setStep} {...props} />}
      {step === 3 && <Step3 setStep={setStep} {...props} />}

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
          />
        </MobileFooter>
      )}
    </Container>
  );
};

export default RequestAndNegotiateView;
